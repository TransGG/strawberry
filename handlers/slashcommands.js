const fs = require('fs')
const { getFiles } = require('../util/functions')

// loads in all commands in slashcommands/

module.exports = (bot, reload) => {
    const { client } = bot

    // load files
    let slashcommands = getFiles('./slashcommands/', '.js')

    // check if no commands were loaded from files
    if(slashcommands.length === 0) {
        console.log('No slash commands loaded from files')
    }

    // go through file names and (re)load & set commands
    slashcommands.forEach(f => {
        // if reloading, delete from cache
        if (reload) {
            delete require.cache[require.resolve(`../slashcommands/${f}`)]
        }

        // import the commands from the directory and set them in the server
        const slashcmd = require(`../slashcommands/${f}`)
        client.slashcommands.set(slashcmd.name, slashcmd)
    })
}