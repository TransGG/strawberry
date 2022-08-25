const Discord = require('discord.js')
require('dotenv').config()

// loads all slash commands into the given server when the bot is ran

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds
    ]
})

let bot = {
    client
}

const guildId = '987229949041725520'

client.slashcommands = new Discord.Collection()

// load the slash commands
client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload)
client.loadSlashCommands(bot, false)

// load in the slash commands to the guild (requires application.commands in OAuth2 scope)
client.on('ready', async () => {
    // get the guild that matches the guildId
    const guild = client.guilds.cache.get(guildId)
    // check if bot doesn't see guild or doesn't login
    if(!guild) {
        return console.error('Target guild not found')
    }

    // set the commands
    await guild.commands.set([...client.slashcommands.values()]) // this puts all of the slash commands' information into a single array, passes them to the guild commands, and sets them

    // success message and exit
    console.log(`Successfully loaded in ${client.slashcommands.size} slash commands`)
    process.exit(0)
})

client.login(process.env.TOKEN)