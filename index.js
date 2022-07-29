require('dotenv').config()
const { Client, GatewayIntentBits, Partials, MessageFlags, MessageManager } = require('discord.js')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('messageCreate', message => {
    console.log('msg content: ', message.content)
    if (message.content.toLocaleLowerCase() === 'hi'){
        message.reply(`U/n: ${message.author.username} ID: <@${message.author.id}> Tag: ${message.author.tag}`)
    }
})

const welcomeChannelId = '987229949633105982'

client.on('guildMemberAdd', (member) => {
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the server!`)
})

client.login(process.env.TOKEN)