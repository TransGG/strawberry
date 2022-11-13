import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import Modal from '../Modal.js';

/**
 * Handler for THEO_SEND modal. Accepts input to create a message to send
 */
class TheoSend extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'THEO_SEND') {
        super(name);
    }

    /**
     * @returns {ModalBuilder} The data that describes the modal format to the Discord API
     */
    getData() {
        return new ModalBuilder()
            .setCustomId('THEO_SEND')
            .setTitle('Send a Message as Theo!')
            .addComponents([
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('message')
                            .setRequired(true)
                            .setMinLength(1)
                            .setMaxLength(1999)
                            .setLabel('Message')
                            .setStyle(TextInputStyle.Paragraph)
                            .setPlaceholder('Message to send here.'),
                    ),
            ]);
    }

    /**
     * Method to run when this modal is submitted
     * @param {ModalSubmitInteraction} interaction The interaction that was emitted when this modal was submitted
     */
    async run(interaction) {
        function escapeMarkdown(text) {
            const unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1');
            const escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1');
            return escaped;
        }

        // Question: are the backticks deliberate?
        await interaction.reply({
            content: 'Message sent as in the current channel\nIf you would like to edit or delete this message, right click the message and choose `Apps > Edit Message` or `Apps > Delete Message` respectively.',
            ephemeral: true,
        });

        const message = interaction.fields.getTextInputValue('message');
        await interaction.channel.send({
            content: escapeMarkdown(message),
        });
    }
}

export default TheoSend;
