import Interaction from '../classes/Interaction.js';

/**
 * Parent class for commands. Subclasses should have a run() function, which is called when
 * the command is ran
 */
class SlashCommand extends Interaction {
    // fields
    data; // the data used to register a slash command

    /**
     * Constructor for class SlashCommand
     * 
     * @param {Client} client The Discord client
     * @param {string} name The name of the slash command
     */
     constructor(client, name) {
        super(client, name);
    }
}

export default SlashCommand;