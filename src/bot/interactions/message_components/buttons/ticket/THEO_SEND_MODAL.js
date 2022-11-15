import { ButtonBuilder, ButtonStyle } from 'discord.js';
import Button from '../../Button.js';

/**
 * Handler for THEO_SEND_MODAL button. Displays a modal that will send a message
 */
class TheoSendModal extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'THEO_SEND_MODAL') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Send a Message as Theo')
            .setStyle(ButtonStyle.Secondary);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        await interaction.showModal(interaction.client.getModal('THEO_SEND'));
    }
}

export default TheoSendModal;
