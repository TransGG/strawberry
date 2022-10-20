import { SlashCommandSubcommandBuilder } from 'discord.js';
import SubCommand from '../../../Subcommand.js';

/**
 * Handler for Listen subcommand. Demonstration of a subcommand within a subcommand group.
 */
class Listen extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'listen') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('From the famous song, \'Water Vapor, Water Vapor, Adult\'');
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the slash command was
     *     executed
     */
    async run(interaction) {
        await interaction.reply({ content: 'Stop, collaborate and listen!', ephemeral: true });
    }
}

export default Listen;
