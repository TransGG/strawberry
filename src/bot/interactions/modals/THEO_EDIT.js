import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import Modal from '../Modal.js';

/**
 * Handler for THEO_EDIT modal. Helper modal for input for Edit Message ctx menu command.
 */
class TheoEdit extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'THEO_EDIT') {
        super(name);
    }

    /**
     * @returns {ModalBuilder} The data that describes the modal format to the Discord API
     */
    getData() {
        return new ModalBuilder()
            .setCustomId(this.name)
            .setTitle('What should the message be edited to?')
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('message')
                            .setRequired(true)
                            .setMinLength(1)
                            .setMaxLength(1999)
                            .setLabel('New Message')
                            .setStyle(TextInputStyle.Paragraph)
                            .setPlaceholder('New Message Here.'),
                    ),
            );
    }

    /**
     * Method to run when this modal is submitted
     * @param {ModalSubmitInteraction} interaction The interaction that was emitted when this modal was submitted
     * @param {string} messageId The id of the message to edit
     */
    async run(interaction, messageId) {
        function escapeMarkdown(text) {
            const unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1');
            const escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1');
            return escaped;
        }

        await interaction.reply({
            content: 'Message Edited.',
            ephemeral: true,
        });

        const message = await interaction.channel.messages.fetch(messageId);
        if (!message) {
            await interaction.reply({
                content: 'Message not found.',
                ephemeral: true,
            });
            return;
        }

        const messageInput = interaction.fields.getTextInputValue('message');
        await message.edit({
            content: escapeMarkdown(messageInput),
        });
    }
}

export default TheoEdit;
