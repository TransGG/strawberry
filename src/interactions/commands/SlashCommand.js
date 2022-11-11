import Interaction from '../Interaction.js';

/**
 * Parent class for slash command handlers.
 */
class SlashCommand extends Interaction {
    constructor(name, guild = null) {
        super(name);

        if (guild) {
            this.guild = guild;
        }
    }
}

export default SlashCommand;
