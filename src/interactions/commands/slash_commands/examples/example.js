import SlashCommandWithSubcommands from '../../SlashCommandWithSubcommands.js';

/**
 * Handler for example slash command. Creates various examples
 */
class Example extends SlashCommandWithSubcommands {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'example') {
        super(name);
    }
}

export default Example;
