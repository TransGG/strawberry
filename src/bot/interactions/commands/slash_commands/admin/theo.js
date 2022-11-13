import config from '../../../../../config/config.js';
import SlashCommandWithSubcommands from '../../SlashCommandWithSubcommands.js';

/**
 * Handler for theo slash command.
 */
class Theo extends SlashCommandWithSubcommands {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'theo', guild = config.guild) {
        super(name, guild);
    }
}

export default Theo;
