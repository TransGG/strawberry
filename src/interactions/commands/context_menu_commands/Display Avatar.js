import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import ContextMenuCommand from '../ContextMenuCommand.js';

/**
 * Handler for Display Avatar user context menu command. Displays the avatar of the user.
 */
class DisplayAvatar extends ContextMenuCommand {
    /**
     * @param {string} name The name of this context menu command
     */
    constructor(name = 'Display Avatar') {
        super(name);
    }

    /**
     * @returns {ContextMenuCommandBuilder} The data that describe the command format to the Discord API
     */
    getData() {
        return new ContextMenuCommandBuilder()
            .setName(this.name)
            .setType(ApplicationCommandType.User);
    }

    /**
     * Method to run when this context menu command is executed
     * @param {UserContextMenuCommandInteraction} interaction The interaction that was emitted when this command was
     *     executed
     */
    async run(interaction) {
        await interaction.reply({
            content: `${interaction.user.username} wanted to see ${interaction.targetUser.displayAvatarURL()}`,
            ephemeral: true,
        });
    }
}

export default DisplayAvatar;
