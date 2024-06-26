import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';

import InteractionHelper from '../../../utils/InteractionHelper.js';
import ContextMenuCommand from '../ContextMenuCommand.js';

/**
 * Handler for Delete Message context menu command.
 */
class DeleteMessage extends ContextMenuCommand {
    /**
     * @param {string} name The name of this context menu command
     */
    constructor(name = 'Delete Message') {
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
            .setDefaultMemberPermissions(0);
    }

    /**
     * Method to run when this context menu command is executed
     * @param {MessageContextMenuCommandInteraction} interaction The interaction that was emitted
     *     when this command was executed
     */
    async run(interaction) {
        if (interaction.targetMessage.embeds.length > 0) {
            await InteractionHelper.reply(interaction, 'You cannot delete an embed.', true);
        } else {
            await InteractionHelper.deferReply(interaction, true);

            await interaction.targetMessage.delete();
            await InteractionHelper.reply(interaction, 'Message deleted.');
        }
    }
}

export default DeleteMessage;
