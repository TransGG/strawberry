import Interaction from '../Interaction.js';

/**
 * Parent class for context menu command interaction handlers.
 */
class ContextMenuCommand extends Interaction {
    constructor(name, guild = null) {
        super(name);

        if (guild) {
            this.guild = guild;
        }
    }
}

export default ContextMenuCommand;
