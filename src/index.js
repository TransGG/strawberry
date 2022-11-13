import yargs from 'yargs';
import startBot from './bot/index.js';
import config from './config/config.js';

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

// start bot
await startBot(clean, register, guild);

// catch unhandled exceptions/promise rejections if in prod
if (process.env.NODE_ENV === 'production') {
    process.on('unhandledRejection', (err) => {
        console.error('Unhandled promise rejection:', err);
    });

    process.on('uncaughtException', (err) => {
        console.error(`Uncaught exception: ${err}`);
    });
}
