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

// handle slash commands
// an interactionCreate what is triggered when a slash command is executed
client.on('interactionCreate', (interaction) => {
    // permission and validity checking
    // the three types of interaction are commands, dropdown menus, and buttons
    // we want to only deal with commands, so we ignore all others
    if (!interaction.isChatInputCommand()) {
        return
    }
    // slash commands should only be used in guilds
    if (!interaction.inGuild()) {
        return interaction.reply('This command can only be used in a server')
    }

    // get slash command based on the commandName from the interaction
    const slashcmd = client.slashcommands.get(interaction.commandName)

    // slash command not found
    if (!slashcmd) {
        return interaction.reply('Invalid slash command')
    }

    // permission check for member
    if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm)) {
        return interaction.reply('You do not have permission for this command')
    }

    // run the slash command
    slashcmd.run(client, interaction)
})

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