import { SlashCommandBuilder } from 'discord.js';

import { buildEmojiVoidComponents, emojiVoidEmbeds } from '../../../../../content/emojiVoid.js';
import InteractionHelper from '../../../../utils/InteractionHelper.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for sendEmojiVoidBack slash command. Sends the leave emoji void message
 */
class SendEmojiVoidBack extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'sendemojivoidback') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sends the remove emoji void message in this channel')
            .setDefaultMemberPermissions(0)
            .setDMPermission(false)
            .addBooleanOption((option) => option
                .setName('preview')
                .setDescription('Whether to preview the message'));
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        const preview = interaction.options.getBoolean('preview');

        const messageContent = {
            embeds: emojiVoidEmbeds,
            components: buildEmojiVoidComponents(interaction.client),
        };

        if (preview) {
            await InteractionHelper.reply(interaction, messageContent, true);
        } else {
            await InteractionHelper.deferReply(interaction, true);

            await interaction.channel.send(messageContent);
            await InteractionHelper.reply(interaction, 'Sent!');
        }
    }
}

export default SendEmojiVoidBack;
