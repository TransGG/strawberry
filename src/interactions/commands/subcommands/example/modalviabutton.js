import { ActionRowBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import SubCommand from '../../Subcommand.js';

/**
 * Handler for modalviabutton subcommand. Creates a message with a button that shows a modal to demonstrate the behavior
 * of modals when they come from a message component.
 */
class ModalViaButton extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'modalviabutton') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('Creates a modal triggered by a button!');
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the slash command was
     *     executed
     */
    async run(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(interaction.client.getButton('modalButton'));
        await interaction.reply({ ephemeral: true, components: [row] });
    }
}

export default ModalViaButton;
