import Interaction from '../Interaction.js';

class Button extends Interaction {
    /**
     * Serializes this component to an API-compatible JSON object. Useful so you can pass a Button directly to
     * ActionRowBuilder().addComponents()
     * @returns {APIButtonComponent} The data of this button in JSON
     */
    toJSON() {
        return this.getData().toJSON();
    }
}

export default Button;
