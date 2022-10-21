import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for echo slash command. Repeats the message back to the user. For the purpose of demonstrating simple
 * parameter handling
 */
class Echo extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'echo') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Repeats the input back at you!')
            .addStringOption((option) => option.setName('message')
                .setDescription('The message to echo')
                .setRequired(true));
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this slash command was
     *     executed
     */
    async run(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply({ content: message, ephemeral: true });
    }
}

export default Echo;
