import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import denyKick from '../../../verification/managers/denyKick.js';
import Modal from '../Modal.js';

/**
 * Handler for KICK_USER modal. Modal to kick a user and provide reasons
 */
class KickUser extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'KICK_USER') {
        super(name);
    }

    /**
     * @returns {ModalBuilder} The data that describes the modal format to the Discord API
     */
    getData() {
        return new ModalBuilder()
            .setCustomId(this.name)
            .setTitle('Deny a users verification.')
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('userReason')
                            .setRequired(true)
                            .setMinLength(5)
                            .setMaxLength(1024)
                            .setLabel('Reason (Sent To User) (REQUIRES DMs ENABLED)')
                            .setStyle(TextInputStyle.Paragraph)
                            .setPlaceholder('You were kicked/your application has been rejected because...'),
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('logReason')
                            .setRequired(false)
                            .setMinLength(5)
                            .setMaxLength(1024)
                            .setLabel('Logs Reason (Not Shared With User)')
                            .setStyle(TextInputStyle.Paragraph)
                            .setPlaceholder('Optional.'),
                    ),
            );
    }

    /**
     * Method to run when this modal is submitted
     * @param {ModalSubmitInteraction} interaction The interaction that was emitted when this modal
     *     was submitted
     */
    async run(interaction) {
        await denyKick(
            (message) => interaction.reply({
                content: message,
                ephemeral: true,
            }),
            (message) => interaction.reply({
                content: message,
                ephemeral: true,
            }),
            interaction.channel,
            interaction.member,
            interaction.fields.getTextInputValue('userReason'),
            interaction.fields.getTextInputValue('logReason'),
        );
    }
}

export default KickUser;
