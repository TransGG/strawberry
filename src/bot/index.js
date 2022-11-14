import Discord from 'discord.js';
import Bot from './Bot.js';
import config from '../config/config.js';
import { FatalError } from './utils/errors.js';

async function startBot(clean, registerCommands, guildId) {
    const bot = new Bot({
        intents: [
            Discord.GatewayIntentBits.Guilds,
            Discord.GatewayIntentBits.GuildMembers,
        ],
    });

    // start the bot
    await bot.start(config.token, {
        clean,
        registerCommands,
        guildId,
    }).catch((error) => {
        /*
         * any error encountered during startup is considered fatal because they may place the bot
         * in an unexpected or unrecoverable state and they are immediately actionable
         */
        throw new FatalError('Encountered an error on client startup:', { cause: error });
    });
}

export default startBot;
