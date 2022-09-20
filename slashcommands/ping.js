import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../classes/SlashCommand.js'

/**
 * Handler for ping slash command. Replies to the given message with 'pong!'
 * Can be used to test if the bot is working.
 */
 class Ping extends SlashCommand {
    constructor(client, name) {
        super(client, name)

        this.data = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!');
    }
    
    async run(interaction) {
        await interaction.reply('Pong!');
    }
}

export default Ping