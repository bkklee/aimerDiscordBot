const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
} = require('discord.js'); //Discord
let request = require('request'); //HTML request
let HTMLParser = require('node-html-parser'); //HTMLParser

const { fetcher } = require('./fetcher');
const { parser } = require('./parser');
const { detailedFormatter } = require('./formatter');
const { rectifyTickerSymbol } = require('./tickerSymbol');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

bot.on('ready', () => {
    bot.user.setActivity('Ref:rain');
    const stock = new SlashCommandBuilder()
        .setName('stock')
        .setDescription('Check stock price')
        .addStringOption((option) =>
            option
                .setName('symbol')
                .setDescription('Symbol of the stock')
                .setRequired(true),
        );
    bot.application.commands.create(stock);
    const gpt = new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('GPT-4o')
        .addStringOption((option) =>
            option
                .setName('text')
                .setDescription('Ask gpt something')
                .setRequired(true),
        );
    bot.application.commands.create(gpt);
});

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    try {
        if (interaction.commandName === 'stock') {
            //const REGEX_CHINESE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
            const code = rectifyTickerSymbol(
                interaction.options.getString('symbol'),
            );
            fetcher(code).then((body) => {
                const info = parser(body);

                if (info) {
                    interaction.reply(detailedFormatter(info));
                } else {
                    interaction.reply('冇呢隻股');
                }
            });
        }

        if (interaction.commandName === 'gpt') {
            const messages = interaction.options.getString('text');

            const url = process.env.OPENAI_API_URL;
            const headers = {
                'Content-Type': 'application/json',
                'api-key': process.env.OPENAI_API_KEY,
            };
            const settings = {
                messages: [{ role: 'system', content: 'You are a teacher.' }],
                temperature: 0.7,
                top_p: 0.95,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 800,
                stop: null,
            };

            settings['messages'].push({ role: 'user', content: messages });

            await interaction.reply('Waiting');
            request.post(
                { url: url, headers: headers, json: settings },
                function (e, r, body) {
                    interaction.editReply(body.choices[0].message.content);
                },
            );
        }
    } catch {
        interaction.reply('Something is wrong, tell me to fix it.');
    }
});

bot.login(process.env.DISCORD_API);
