import Discord from 'discord.js'
import 'dotenv/config'
import Bot from './classes/Bot.js'

const client = new Bot({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ],
    prefix: '.'
})

client.loadEvents()
client.loadCommands()

client.start(process.env.TOKEN)