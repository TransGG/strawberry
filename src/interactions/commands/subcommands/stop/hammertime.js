import { SlashCommandSubcommandBuilder } from 'discord.js';
import SubCommand from '../../Subcommand.js';

/**
 * Handler for Hammertime subcommand. Demonstration of a subcommand without a subcommand group.
 */
class Hammertime extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'hammertime') {
        super(name);
    }

    /**
     * @returns {SlashCommandSubcommandBuilder} The data that describes the command format to the
     *     Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('From the famous song, \'I Can Touch That\'');
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the
     *     slash command was executed
     */
    async run(interaction) {
        await interaction.reply({ content: 'Stop, hammertime!', ephemeral: true });
    }
}

export default Hammertime;
