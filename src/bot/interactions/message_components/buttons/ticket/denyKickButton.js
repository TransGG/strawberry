import { ButtonBuilder, ButtonStyle } from 'discord.js';
import Button from '../../Button.js';

/**
 * Handler for denyKickButton button. Shows a modal from which a verifier may kick a user
 */
class DenyKickButton extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'denyKickButton') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Kick')
            .setStyle(ButtonStyle.Danger);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        await interaction.showModal(interaction.client.getModal('denyKickModal'));
    }
}

export default DenyKickButton;
