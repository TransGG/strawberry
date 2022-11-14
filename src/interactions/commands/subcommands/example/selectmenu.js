import { ActionRowBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import SubCommand from '../../Subcommand.js';

/**
 * Handler for SelectMenu subcommand. Creates a message with a select menu to demonstrate this
 * project's select menu handling.
 */
class SelectMenuSubcommand extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'selectmenu') {
        super(name);
    }

    /**
     * @returns {SlashCommandSubcommandBuilder} The data that describes the command format to the
     *     Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('Creates a select menu!');
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the
     *     slash command was executed
     */
    async run(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(interaction.client.getSelectMenu('myFirstSelectMenu'));
        await interaction.reply({ content: 'Select!', ephemeral: true, components: [row] });
    }
}

export default SelectMenuSubcommand;
