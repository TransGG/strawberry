import Discord from 'discord.js';
import yargs from 'yargs';
import config from './config/config.js';
import Bot from './Bot.js';
import { FatalError } from './utils/errors.js';

// create bot
const client = new Bot({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});

// parse arguments
const args = yargs(process.argv.slice(2))
    .options({
        d: {
            alias: 'debug',
            describe: 'Enable debug mode',
            type: 'boolean',
        },
        v: {
            alias: 'verbose',
            describe: 'Enable verbose output',
            type: 'boolean',
        },
        r: {
            alias: 'register',
            describe: 'Registers application (slash and context menu) commands',
            type: 'boolean',
        },
        c: {
            alias: 'clean',
            describe: 'Unregisters application (slash and context menu) commands. Only unregisters global commands unless a value for -g was passed',
            type: 'boolean',
        },
        g: {
            alias: 'guild',
            describe: 'Specify a guild to clean guild-specific commands from',
            type: 'string',
        },
    }).argv;
const {
    debug,
    verbose,
    register,
    clean,
    guild,
} = args;

config.debug = debug;
config.verbose = verbose;

const options = {
    clean,
    registerCommands: register,
    guildId: guild,
};

// start the bot
try {
    await client.start(config.token, options);
} catch (error) {
    /* any error encountered during startup is considered fatal because they may place the bot in an unexpected or
       unrecoverable state and they are immediately actionable */
    throw new FatalError('Encountered an error on client startup:', { cause: error });
}
