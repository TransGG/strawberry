import Interaction from './Interaction.js';

/**
 * Parent class for commands. Slash commands should have a run() function, which is called when the command is ran, and
 * a data property, which is used for registration of the command with Discord.
 */
class SlashCommand extends Interaction {
}

export default SlashCommand;
