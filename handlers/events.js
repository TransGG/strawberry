const { getFiles } = require('../util/functions')

/**
 * event handler
 * @param {Object} bot - The bot object from index.js
 * @param {Boolean} reload - true if we are reloading, false if we are loading this in for the first time
 */
module.exports = (bot, reload) => {
    const {client} = bot

    // get all events
    let events = getFiles('./events/', '.js')

    // check for no events
    if (events.length === 0) {
        console.log('No events to load')
    }

    // 
    events.forEach((file, index) => {
        // if reloading, delete all old events
        if (reload) {
            delete require.cache[require.resolve(`../events/${file}`)]
        }

        // get the file for the event and populate client.events with it
        const event = require(`../events/${file}`)
        client.events.set(event.name, event)

        // log what events have been loaded
        if (!reload) {
            console.log (`${index + 1}. ${file} loaded`)
        }
    })

    if (!reload) {
        initEvents(bot)
    }
}

/**
 * helper function for initEvents that tries to get event and if unsuccessful, throws an error
 * @param {Object} bot - The bot object from index.js
 * @param {String} event - The name of the event
 * @param {Array} args - The arguments of the command
 */
function triggerEventHandler(bot, event, ...args) {
    const {client} = bot
    try {
        if (client.events.has(event)) {
            client.events.get(event).run(bot, ...args)
        } else {
            throw new Error (`Event ${event} does not exist`)
        }
    } catch (error) {
        console.error(error)
    }
}

// initializes the event listeners. Should only be initialized once or there will be extra event listeners
function initEvents(bot) {
    const {client} = bot

    // listeners
    client.on('ready', () => { // for start up
        triggerEventHandler(bot, 'ready')
    })
    client.on('messageCreate', (message) => {
        triggerEventHandler(bot, 'messageCreate', message)
    })
    client.on("interactionCreate", (interaction) => {
        triggerEventHandler(bot, "interactionCreate", interaction)
    })
}