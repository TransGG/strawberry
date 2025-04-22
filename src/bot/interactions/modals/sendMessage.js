import {
    ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,
} from 'discord.js';

import config from '../../../config/config.js';
import { escape } from '../../../formatters/escape.js';
import InteractionHelper from '../../utils/InteractionHelper.js';
import Modal from '../Modal.js';

/**
 * Handler for sendMessage modal. Accepts input to create a message to send
 */
class SendMessage extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'sendMessage') {
        super(name);
    }

    /**
     * @returns {ModalBuilder} The data that describes the modal format to the Discord API
     */
    getData() {
        return new ModalBuilder()
            .setCustomId(this.name)
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
     * @param {ModalSubmitInteraction} interaction The interaction that was emitted when this modal
     *     was submitted
     */
    async run(interaction) {
        await InteractionHelper.deferReply(interaction, true);

        const message = interaction.fields.getTextInputValue('message');
        const output = await interaction.channel.send({
            content: escape(message),
        });

        await InteractionHelper.reply(
            interaction,
            'Message sent as in the current channel\nIf you would like to edit or delete this message, right click the message and choose `Apps > Edit Message` or `Apps > Delete Message` respectively.',
            true,
        );

        const logChannel = interaction.guild.channels.cache.get(
            config.guilds[interaction.guild.id].channels.theoSendLogs,
        );

        if (logChannel) {
            logChannel.send({
                embeds: [
                    {
                        author: {
                            icon_url: interaction.user.displayAvatarURL({ static: true }),
                            name: interaction.user.username,
                        },
                        title: 'Message sent as bot',
                        description: `${message}\n\n-# [jump to message](${output.url}) — sent by \`${interaction.user.id}\``,
                    },
                ],
            });
        }
    }
}

export default SendMessage;
