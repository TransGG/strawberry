import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../classes/SlashCommand.js';

/**
 * Handler for ping slash command. Replies to the given message with 'pong!'. Can be used to test if the bot is working.
 */
class Ping extends SlashCommand {
    /**
     * Constructor for Ping class and instantiates this.data
     * 
     * @param {Client} client The Discord Client that will handle this command
     * @param {string} name The name of this slash command
     */
    constructor(client, name) {
        super(client, name);

        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription('Replies with Pong!');
    }

    /**
     * Method to run when this slash command is executed
     * 
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
     */
    async run(interaction) {
        await interaction.reply({ content: 'Pong!', ephemeral: true });
    }
}

export default Ping;