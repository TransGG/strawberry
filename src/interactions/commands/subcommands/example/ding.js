import { ActionRowBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import SubCommand from '../../Subcommand.js';

/**
 * Handler for Ding subcommand. Creates a message with a button to demonstrate this project's button
 * handling.
 */
class Ding extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'ding') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('Creates a button!');
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the slash command was
     *     executed
     */
    async run(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(interaction.client.getButton('ding'));
        await interaction.reply({ content: 'Ding!', ephemeral: true, components: [row] });
    }
}

export default Ding;
