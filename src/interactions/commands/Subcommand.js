import SlashCommand from './SlashCommand.js';

/**
 * Parent class for subcommands. Subclasses should have a run() function, which is called when the subcommand is ran,
 * and a data property, which is used for registration of the command with Discord.
 */
class Subcommand extends SlashCommand {
}

export default Subcommand;
