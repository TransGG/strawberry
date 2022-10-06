import Interaction from './Interaction.js';

/**
 * Parent class for commands. Subclasses should have a run() function, which is called when
 * the command is ran
 */
class SlashCommand extends Interaction {
    // fields
    data; // the data used to register a slash command
}

export default SlashCommand;
