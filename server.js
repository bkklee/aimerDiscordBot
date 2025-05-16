const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
} = require('discord.js'); //Discord
let request = require('request'); //HTML request

const { parser } = require('./parser');
const { nameToSymbolsMapping, nameToTitleMapping } = require('./bulk');
const { oneLineFormatter, detailedFormatter } = require('./formatter');
const { rectifyTickerSymbol } = require('./tickerSymbol');
const { askAI } = require('./aiClient');

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
        .setDescription('OpenAI o3')
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

            if (code.startsWith(':')) {
                const isValid =
                    Object.prototype.hasOwnProperty.call(
                        nameToTitleMapping,
                        code,
                    ) &&
                    Object.prototype.hasOwnProperty.call(
                        nameToSymbolsMapping,
                        code,
                    );

                if (isValid) {
                    const bodies = await Promise.all(
                        nameToSymbolsMapping[code].map((sym) => sym),
                    );
                    const infoList = bodies.flatMap((body) => {
                        const parsed = body && parser(body);

                        return parsed ? [parsed] : [];
                    });
                    const formatted = infoList.flatMap((info) =>
                        info ? [oneLineFormatter(info)] : [],
                    );

                    interaction.reply(
                        `**${nameToTitleMapping[code]}**\n${formatted.join('\n')}`,
                    );
                } else {
                    // TODO: Can AI suggest?
                    interaction.reply('冇呢個列表');
                }
            } else {
                try {
                    if (code) {
                        const info = await parser(code);

                        if (info) {
                            interaction.reply(detailedFormatter(info));

                            return;
                        }else{
                            //ASK AI
                            interaction.reply('Thinking');

                            // TODO: Find a way to escape or sanitize `code`.
                            const question = `Please tell me the ticker symbol for "${code}" used in Yahoo! Finance. If it is listed in multiple exchanges, prioritize according to the most likely location of the headquarter of the company. Please retain the exchange suffix, and do not put extra words in the response.`;
                            const symbol = rectifyTickerSymbol(await askAI(question));

                            await interaction.editReply('Querying');

                            const info = await parser(symbol);

                            if (info) {
                                await interaction.editReply(detailedFormatter(info));
                            } else {
                                await interaction.editReply('冇呢隻股');
                            }
                            return;
                        }
                    }else{
                        await interaction.reply("Problems");
                    }
                } catch {
                    // pass
                    await interaction.editReply("Problems");
                }
            }
        }

        if (interaction.commandName === 'gpt') {
            const messages = interaction.options.getString('text');

            await interaction.reply('Waiting');

            let reply = await askAI(messages)
            interaction.editReply(reply);
            return;
        }
    } catch {
        try{
            interaction.reply('Something is wrong, tell me to fix it.');
        }catch{
            interaction.editReply('Something is wrong, tell me to fix it.');
        }
    }
});

bot.login(process.env.DISCORD_API);
