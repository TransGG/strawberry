import { ActionRowBuilder, SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for makedingbutton slash command. Creates a message with a button to demonstrate this project's button
 * handling.
 */
class MakeDingButton extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'makedingbutton') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Creates a button!');
    }

    /**
     * Method to run when this slash command is executed
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
     */
    async run(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(interaction.client.getButton('ding'));
        await interaction.reply({ content: 'Ding!', ephemeral: true, components: [row] });
    }
}

export default MakeDingButton;
