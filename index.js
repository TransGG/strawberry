require('dotenv').config()
const { Client, GatewayIntentBits, Partials, MessageFlags } = require('discord.js')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('messageCreate', message => {
    console.log('msg content: ', message.content)
    if (message.content.toLocaleLowerCase() === 'hi'){
        message.reply(`U/n: ${message.author.username} ID: ${message.author.id} Tag: ${message.author.tag}`)
    }
})

client.login(process.env.TOKEN)