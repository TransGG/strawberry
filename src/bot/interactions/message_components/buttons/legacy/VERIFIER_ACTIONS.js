import {
    ButtonBuilder,
    ButtonStyle,
    Events,
} from 'discord.js';
import Button from '../../Button.js';
import reemitInteraction from '../../../../utils/reemit.js';

/**
 * Handler for VERIFIER_ACTIONS button. Brings up menu for verifiers to choose actions from.
 */
class VerifierActions extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'VERIFIER_ACTIONS') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        console.error(`${this.name}: should really not be getting data of a legacy button!`);
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Verifier Actions (Staff Only)')
            .setStyle(ButtonStyle.Danger);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        reemitInteraction(
            Events.InteractionCreate,
            interaction,
            interaction.client.getButton('verifierActions'),
        );
    }
}

export default VerifierActions;
