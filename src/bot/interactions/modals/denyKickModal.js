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
 * Handler for denyKickModal modal. Modal to kick a user and provide reasons
 */
class DenyKickModal extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'denyKickModal') {
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
                            .setLabel('Reason (Sent To User)')
                            .setStyle(TextInputStyle.Paragraph)
                            .setMaxLength(1000)
                            .setPlaceholder('You were kicked/your application has been rejected because...')
                            .setRequired(true),
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('logReason')
                            .setLabel('Logs Reason (Not Shared With User)')
                            .setStyle(TextInputStyle.Paragraph)
                            .setMaxLength(1000)
                            .setPlaceholder('Optional.')
                            .setRequired(false),
                    ),
            );
    }

    /**
     * Method to run when this modal is submitted
     * @param {ModalSubmitInteraction} interaction The interaction that was emitted when this modal
     *     was submitted
     */
    async run(interaction) {
        await interaction.deferReply({ ephemeral: true });

        await denyVerification(
            DenyConsequence.kick,
            {
                ticket: interaction.channel,
                verifier: interaction.member,
                userReason: interaction.fields.getTextInputValue('userReason'),
                logReason: interaction.fields.getTextInputValue('logReason'),
            },
            (message) => interaction.editReply({ content: message, ephemeral: true }),
        ).catch(async (error) => {
            if (error instanceof VerificationError) {
                await interaction.editReply({ content: error.message, ephemeral: true });
            } else {
                await interaction.editReply({ content: `Error: ${error.message}`, ephemeral: true });
                throw error;
            }
        });
    }
}

export default DenyKickModal;
