import { ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import reemitInteraction from '../../../../utils/reemit.js';
import Button from '../../Button.js';

/**
 * Handler for START_VERIFICATION button. Re-emits START_VERIFICATION button interactions as a
 * startVerification button interaction
 */
class StartVerificationLegacy extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'START_VERIFICATION') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        console.error(`${this.name}: should really not be getting data of a legacy button!`);
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Start Verification')
            .setStyle(ButtonStyle.Success);
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
            interaction.client.getButton('startVerification'),
        );
    }
}
export default StartVerificationLegacy;
