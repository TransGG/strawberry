const fs = require('fs')
const { getFiles } = require('../util/functions')

// loads in all commands in buttons/

module.exports = (bot, reload) => {
    const { client } = bot

    // load files
    let buttons = getFiles('./buttons/', '.js')

    // check if no commands were loaded from files
    if(buttons.length === 0) {
        console.log('No buttons commands loaded from files')
    }

    // go through file names and (re)load & set commands
    buttons.forEach(f => {
        // if reloading, delete from cache
        if (reload) {
            delete require.cache[require.resolve(`../buttons/${f}`)]
        }

        // import the commands from the directory and set them in the server
        const button = require(`../buttons/${f}`)
        client.buttons.set(button.name, button)
    })
}