import Discord from 'discord.js';
import 'dotenv/config';
import yargs from 'yargs';
import Bot from './Bot.js';

const client = new Bot({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
    // prefix: '.'
});

// parse arguments
const args = yargs(process.argv.slice(2))
    .options({
        r: {
            alias: 'register',
            describe: 'registers slash commands',
            type: 'boolean',
        },
        c: {
            alias: 'clean',
            describe: 'does a clean register if used with -r, or clears all commands if used without -r',
            type: 'boolean',
        },
        g: {
            alias: 'guild',
            describe: '-r and -c default to global, give the id of a guild to do perform -r and -c in a guild',
            type: 'string',
        },
    }).argv;
const { register, clean, guild } = args;

const options = {
    clean,
    doRegisterSlashCommands: register,
    guildId: guild,
};

client.start(process.env.TOKEN, options);
