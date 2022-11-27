import {
    SlashCommandBuilder,
} from 'discord.js';
import { buildWelcomeComponents, welcomeEmbeds } from '../../../../../content/welcome.js';
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
        const components = buildWelcomeComponents(interaction.client);
        if (preview) {
            await interaction.reply({
                embeds: welcomeEmbeds,
                components,
                ephemeral: true,
            });
        } else {
            await interaction.channel.send({
                embeds: welcomeEmbeds,
                components,
            });
            await interaction.reply({ content: 'Sent!', ephemeral: true });
        }
    }
}

export default SendWelcome;
