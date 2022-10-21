import Interaction from '../Interaction.js';

/**
 * Parent class for select menu interaction handlers.
 */
class SelectMenu extends Interaction {
    /**
     * Serializes this component to an API-compatible JSON object. Useful so you can pass a SelectMenu directly to
     * ActionRowBuilder().addComponents()
     * @returns {APIButtonComponent} The data of this button in JSON
     */
    toJSON() {
        return this.getData().toJSON();
    }
}

export default SelectMenu;
