import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../classes/SlashCommand.js';

/**
 * Handler for echo slash command. Repeats the message back to the user. For the purpose of demonstrating simple parameter handling
 */
class Echo extends SlashCommand {
    /**
     * Constructor for Echo class and instantiates this.data
     * 
     * @param {Client} client The Discord Client that will handle this command
     * @param {string} name The name of this slash command
     */
    constructor(client, name) {
        super(client, name);

        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription('Repeats the input back at you!')
            .addStringOption(option =>
                option.setName('message')
                    .setDescription('The message to echo')
                    .setRequired(true)
            );
    }

    /**
     * Method to run when this slash command is executed
     * 
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
     */
    async run(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply({ content: message, ephemeral: true });
    }
}

export default Echo;