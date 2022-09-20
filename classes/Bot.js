import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import fs from 'fs'
import { Client, Collection } from 'discord.js'

// the absolute path to this file
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Helper function that gets the JavaScript files directly within the specified directory
 * 
 * @param {string|Buffer|URL} directory The directory to search
 * @returns All files that end with '.js' within the given directory
 */
function getFiles(directory) {
    return fs.readdirSync(directory).filter((file) => file.endsWith('.js'))
}

class Bot extends Client {

    /**
     * Constructor for class Bot. Initializes the class members.
     * 
     * @param {*} args 
     */
    constructor(args) {
        super(args)

        // initialize class members
        this.prefix = args.prefix

        // these collections are populated as a map with the name of the event/slash command/etc.
        // as the key and the content as the value
        // this.commands = new Collection()
        this.events = new Collection()
        this.slashCommands = new Collection()
    }

    /**
     * Run this function to get the bot going. Loads the necessary files to populate the members of the Bot, optionally registers slash
     * commands, then connects to Discord using the Discord API
     * 
     * @param {string} token The OAuth2 token to use to log in to the bot (see https://discord.com/developers/docs/topics/oauth2#bots)
     * @param {boolean} doRegisterSlashCommands Will register slash commands if true, do nothing otherwise
     */
    async start(token, doRegisterSlashCommands = true) {
        this.loadEvents()
        // this.loadCommands()
        this.loadSlashCommands().then(() => {
            if(doRegisterSlashCommands) {
                this.registerSlashCommands() // has to wait on a promise because it relies on the files to be loaded in loadSlashCommands() for the sake of efficiency
            }
        })


        await super.login(token)
    }

    /**
     * Get and load the events. Loads all events within .js files within ../events/
     * and adds them to the corresponding collection member of this class
     */
    loadEvents() {
        const eventsDirectory = `${(this, __dirname)}/../events/`
        return Promise.all(getFiles(eventsDirectory).map(async (eventFileName) => {
            const eventName = eventFileName.split('.js')[0] // event name is the filename sans the .js
            const Event = (await import(pathToFileURL(`${eventsDirectory}${eventFileName}`).toString())).default // import the specific .js file for the event e.g. messageCreate.js
            const event = new Event(this, eventName) // create an Event
            event.startListener() // initalize the listener
            this.events.set(eventName, event) // add the Event to the collection in this bot
        }))
    }

    /**
     * Get and load the slash commands. Same flow as this.loadEvents() without initalizing the listener
     */
    loadSlashCommands() {
        const slashCommandsDirectory = `${(this, __dirname)}/../slashcommands/`
        return Promise.all(getFiles(slashCommandsDirectory).map(async (slashCommandFileName) => {
            const slashCommandName = slashCommandFileName.split('.js')[0]
            const SlashCommand = (await import(pathToFileURL(`${slashCommandsDirectory}${slashCommandFileName}`).toString())).default
            const slashCommand = new SlashCommand(this, slashCommandName)
            this.slashCommands.set(slashCommandName, slashCommand)
        }))
    }


    /**
     * Retrieves the slash command that matches the given name.
     * 
     * @param {string} slashCommandName 
     * @returns The slash command that has the same file name as the name given
     */
    getSlashCommand(slashCommandName) {
        return this.slashCommands.get(slashCommandName)
    }

    registerSlashCommands() {
        console.log(this.slashCommands)
    }

    // methods for using text commands, which Discord doesn't want us to use anymore

    // /**
    //  * Get and load the commands. Same flow as this.loadEvents() minus the initialization of a listener.
    //  */
    //  loadCommands() {
    //     const commandsDirectory = `${(this, __dirname)}/../commands/`
    //     getFiles(commandsDirectory).forEach(async (commandFileName) => {
    //         const commandName = commandFileName.split('.js')[0]
    //         const Command = (await import(pathToFileURL(`${commandsDirectory}${commandFileName}`).toString())).default
    //         const command = new Command(this, commandName)
    //         this.commands.set(commandName, command)
    //     })
    // }

    // /**
    //  * Retrieves the command that matches the given name.
    //  * 
    //  * @param {string} commandName 
    //  * @returns The matching command
    //  */
    // getCommand(commandName) {
    //     return this.commands.get(commandName)
    // }
}

export default Bot