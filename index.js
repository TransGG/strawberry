const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers
    ]
})

let bot = {
    client,
    prefix: 'n.',
    owners: ['274206665241395202']
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload)
client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload)

// call our functions
client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)

module.exports = bot

//Code from earlier tutorials
// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on('messageCreate', message => {
//     console.log('msg content:', message.content)
//     if (message.content.toLocaleLowerCase() === 'hi'){
//         message.reply(`U/n: ${message.author.username} ID: <@${message.author.id}> Tag: ${message.author.tag}`)
//     }
// })

// const welcomeChannelId = '987229949633105982'

// client.on('guildMemberAdd', (member) => {
//     member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the server!`)
// })

client.login(process.env.TOKEN)