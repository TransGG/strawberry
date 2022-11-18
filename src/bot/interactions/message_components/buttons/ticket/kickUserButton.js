import { ButtonBuilder, ButtonStyle } from 'discord.js';
import Button from '../../Button.js';

/**
 * Handler for kickUserButton button. Shows a modal from which a verifier may kick a user
 */
class KickUserButtonModal extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'kickUserButton') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Kick the User')
            .setStyle(ButtonStyle.Danger);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        await interaction.showModal(interaction.client.getModal('kickUserModal'));
    }
}

export default KickUserButtonModal;
