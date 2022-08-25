const { getFiles } = require('../util/functions')
const fs = require('fs')

// command handler
// load all commands within commands subfolders

module.exports = (bot, reload) => {
    const {client} = bot

    // go through subfolders and all .js files therein
    fs.readdirSync('./commands/').forEach((category) => {
        // get all commands within the current folder
        let commands = getFiles(`./commands/${category}`, '.js')

        // loop through commands
        commands.forEach((file) => {
            // if reloading, delete all old commands
            if (reload) {
                delete require.cache[require.resolve(`../commands/${category}/${file}`)]
            }

            // get the file for the command and populate client.commands with it
            const command = require(`../commands/${category}/${file}`)
            client.commands.set(command.name, command)
        })
    })

    // log how many commands have been loaded
    console.log(`loaded ${client.commands.size} commands`)
}