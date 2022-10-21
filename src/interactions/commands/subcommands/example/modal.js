import { SlashCommandSubcommandBuilder } from 'discord.js';
import SubCommand from '../../Subcommand.js';

/**
 * Handler for modal subcommand. Creates a message with a modal to demonstrate this project's modal handling.
 */
class ModalSubcommand extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'modal') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('Creates a modal!');
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the slash command was
     *     executed
     */
    async run(interaction) {
        await interaction.showModal(interaction.client.getModal('myFirstModal'));
    }
}

export default ModalSubcommand;
