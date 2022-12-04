import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import { denyVerification, DenyConsequence } from '../../../verification/managers/denyVerification.js';
import VerificationError from '../../../verification/verificationError.js';
import Modal from '../Modal.js';

/**
 * Handler for denyBanModal modal. Modal to kick a user and provide reasons
 */
class DenyBanModal extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'denyBanModal') {
        super(name);
    }

    /**
     * @returns {ModalBuilder} The data that describes the modal format to the Discord API
     */
    getData() {
        return new ModalBuilder()
            .setCustomId(this.name)
            .setTitle('Deny a user\'s verification.')
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
                            .setPlaceholder('You were banned/your application has been rejected because...'),
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
        await denyVerification(
            DenyConsequence.ban,
            {
                ticket: interaction.channel,
                verifier: interaction.member,
                userReason: interaction.fields.getTextInputValue('userReason'),
                logReason: interaction.fields.getTextInputValue('logReason'),
            },
            (message) => interaction.reply({ content: message, ephemeral: true }),
        ).catch(async (error) => {
            if (error instanceof VerificationError) {
                await interaction.reply({ content: error.message, ephemeral: true });
            } else {
                await interaction.reply({ content: `Error: ${error.message}`, ephemeral: true });
                throw error;
            }
        });
    }
}

export default DenyBanModal;
