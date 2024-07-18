const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js'); //Discord
let request = require("request"); //HTML request
let HTMLParser = require('node-html-parser'); //HTMLParser

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
bot.on("ready", ()=>{
    bot.user.setActivity("Ref:rain");
    const stock = new SlashCommandBuilder().setName('stock').setDescription('Check stock price').addStringOption(option=>option.setName('symbol').setDescription('Symbol of the stock').setRequired(true));
    bot.application.commands.create(stock);
    const gpt = new SlashCommandBuilder().setName('gpt').setDescription('GPT-4o').addStringOption(option=>option.setName('text').setDescription('Ask gpt something').setRequired(true));
    bot.application.commands.create(gpt);
})

bot.on('interactionCreate', async (interaction)=>{
    if(!interaction.isChatInputCommand()){
        return;
    }
    try{
        if(interaction.commandName==='stock'){
            //const REGEX_CHINESE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
            const code = interaction.options.getString('symbol');
            let tmpReply = "";
    
            const get_options = {
                url: 'https://finance.yahoo.com/quote/'+code+'/chart?nn=1',
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
                }
            }
    
            request.get(get_options, (err, response, body)=>{
                htmlfile = HTMLParser.parse(body);
    
                if(htmlfile.querySelector('#quote-header-info')){
                    let curPrice = htmlfile.querySelector('#quote-header-info').firstChild.nextSibling.nextSibling.firstChild.firstChild.firstChild.text;
                    let change = htmlfile.querySelector('#quote-header-info').firstChild.nextSibling.nextSibling.firstChild.firstChild.firstChild.nextSibling.firstChild.text;
                    let percentage = parseFloat(change.replace(",",""))/(parseFloat(curPrice.replace(",",""))-parseFloat(change.replace(",","")))*100;
            
                    tmpReply += "> " + htmlfile.querySelector('#quote-header-info').firstChild.nextSibling.firstChild.firstChild.firstChild.text;
                    tmpReply += "\n";
                    tmpReply += "> Price: **" + curPrice + "**" + "/" + change + "\t" + "(" + percentage.toPrecision(3) + "%)";
                    tmpReply += "\n";
                    tmpReply += "> " + htmlfile.querySelector('#quote-market-notice').firstChild.text;
                    tmpReply += "\n";
                    interaction.reply(tmpReply);
                }else{
                    tmpReply += '冇呢隻股';
                    interaction.reply(tmpReply);
                }
            });
        }
    
        if(interaction.commandName==='gpt'){
    
            const messages = interaction.options.getString('text');
    
            const url = process.env.OPENAI_API_URL;
            const headers = {"Content-Type": "application/json", "api-key": process.env.OPENAI_API_KEY}
            const settings = {
                "messages": [{"role": "system","content": "You are a teacher."}],
                "temperature": 0.7,
                "top_p": 0.95,
                "frequency_penalty": 0,
                "presence_penalty": 0,
                "max_tokens": 800,
                "stop": null
            }
    
            settings["messages"].push({"role": "user", "content": messages})
            
            await interaction.reply('Waiting');
            request.post({url: url, headers: headers, json: settings}, function(e, r, body){
                interaction.editReply(body.choices[0].message.content);
            })
        }
    }catch{
        interaction.reply('Something is wrong, tell me to fix it.');
    }
})

bot.login(process.env.DISCORD_API);