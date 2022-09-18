import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import fs from 'fs'
import { Client, Collection } from 'discord.js'

// the absolute path to this file
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Helper function that gets the JavaScript files within a directory
 * 
 * @param {string|Buffer|URL} directory The directory to search
 * @returns All files that end with '.js' within the given directory
 */
function getFiles(directory) {
    return fs.readdirSync(directory).filter((file) => file.endsWith('.js'))
}

class Bot extends Client {

    /**
     * Constructor for class Bot.
     * 
     * @param {*} args 
     */
    constructor(args) {
        super(args)

        // make fields
        this.prefix = args.prefix
        this.commands = new Collection()
        this.events = new Collection()
    }

    /**
     * Function to run on start. Logs in using the given token.
     * 
     * @param {string} token 
     */
    async start(token) {
        await super.login(token)
    }

    /**
     * Get and load the events. First, all .js files directly within ../events/ are retrieved. Subsequently,
     * for all files retrieved, an Event is created, the Event's listener is initialized, then the Event is
     * added to the corresponding collection in this class.
     */
    loadEvents() {
        getFiles(`${(this, __dirname)}/../events/`).forEach(async (eventFileName) => {
            const eventName = eventFileName.split('.js')[0] // event name is the filename sans the .js
            const Event = (await import(pathToFileURL(`${(this, __dirname)}/../events/${eventFileName}`).toString())).default
            const event = new Event(this, eventName)
            event.startListener()
            this.events.set(eventName, event)
        })
    }

    /**
     * Get and load the commands. Same flow as this.loadEvents() minus the initialization of a listener.
     */
     loadCommands() {
        getFiles(`${(this, __dirname)}/../commands/`).forEach(async (commandFileName) => {
            const commandName = commandFileName.split('.js')[0]
            const Command = (await import(pathToFileURL(`${(this, __dirname)}/../commands/${commandFileName}`).toString())).default
            const command = new Command(this, commandName)
            this.commands.set(commandName, command)
        })
    }

    /**
     * Gets the command that matches the given command name.
     * 
     * @param {string} commandName 
     * @returns The matching command
     */
    getCommand(commandName) {
        return this.commands.get(commandName)
    }
}

export default Bot