import { SlashCommandBuilder } from 'discord.js';

import { buildWelcomeComponents, welcomeEmbeds } from '../../../../../content/welcome.js';
import InteractionHelper from '../../../../utils/InteractionHelper.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for sendwelcome slash command. Sends the welcome/rules message
 */
class SendWelcome extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'sendwelcome') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sends the welcome/rules message in this channel')
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
            embeds: welcomeEmbeds,
            components: buildWelcomeComponents(interaction.client),
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

export default SendWelcome;
