import SlashCommandWithSubcommands from '../../classes/SlashCommandWithSubcommands.js';

/**
 * Handler for stop slash command. Demonstration of subcommands and subcommand groups
 */
class Stop extends SlashCommandWithSubcommands {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'stop') {
        super(name);
    }
}

export default Stop;
