import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import ContextMenuCommand from '../ContextMenuCommand.js';

/**
 * Handler for Edit Message context menu command.
 */
class EditMessage extends ContextMenuCommand {
    /**
     * @param {string} name The name of this context menu command
     */
    constructor(name = 'Edit Message') {
        super(name);
    }

    /**
     * @returns {ContextMenuCommandBuilder} The data that describe the command format to the Discord
     *     API
     */
    getData() {
        return new ContextMenuCommandBuilder()
            .setName(this.name)
            .setType(ApplicationCommandType.Message)
            .setDefaultMemberPermissions(null);
    }

    /**
     * Method to run when this context menu command is executed
     * @param {MessageContextMenuCommandInteraction} interaction The interaction that was emitted
     *     when this command was executed
     */
    async run(interaction) {
        if (interaction.targetMessage.embeds.length > 0) {
            await interaction.reply({
                content: 'You cannot edit an embed.',
                ephemeral: true,
            });

            return;
        }

        const modal = interaction.client.getModal('THEO_EDIT').addArgs(interaction.targetMessage.id);

        await interaction.showModal(modal);
    }
}

export default EditMessage;
