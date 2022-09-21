import Discord from 'discord.js'
import 'dotenv/config'
import Bot from './classes/Bot.js'

const client = new Bot({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ],
    // prefix: '.'
})

var registerSlashCommands = false
// if ran with argument '1', then slash commands will be registered
if(process.argv.slice(2)[0] == 1) {
    registerSlashCommands = true
}

client.start(process.env.TOKEN, registerSlashCommands)