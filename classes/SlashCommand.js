/**
 * Parent class for commands. Subclasses should have a run() function, which is called when
 * the command is ran
 */
class SlashCommand {
    /**
     * Constructor for class Command
     * 
     * @param {Client} client The Discord client
     * @param {string} name The name of the command
     */
    constructor(client, name) {
        this.client = client
        this.name = name
    }
}

export default SlashCommand