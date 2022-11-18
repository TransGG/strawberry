import {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    ContextMenuCommandBuilder,
    messageLink,
} from 'discord.js';
import config from '../../../../config/config.js';
import ContextMenuCommand from '../ContextMenuCommand.js';

/**
 * Handler for Update Welcome context menu command. Updates the welcome-verify message to bring the
 * button into compliance with convention
 */
class UpdateWelcome extends ContextMenuCommand {
    /**
     * @param {string} name The name of this context menu command
     */
    constructor(name = 'Update Welcome') {
        super(name);
    }

    /**
     * @returns {ContextMenuCommandBuilder} The data that describe the command format to the Discord
     *     API
     */
    getData() {
        return new ContextMenuCommandBuilder()
            .setName(this.name)
            .setType(ApplicationCommandType.Message);
    }

    /**
     * Method to run when this context menu command is executed
     * @param {MessageContextMenuCommandInteraction} interaction The interaction that was emitted
     *     when this command was executed
     */
    async run(interaction) {
        if (interaction.targetMessage.components[0].components[1].data.custom_id === 'START_VERIFICATION') {
            const magicMessage = '987842342247608410';
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(messageLink(config.channels.lobby, magicMessage, config.guild))
                        .setLabel('Scroll To Top!')
                        .setStyle(ButtonStyle.Link),
                    interaction.client.getButton('startVerification'),
                );

            await interaction.targetMessage.edit({
                components: [row],
            });

            await interaction.reply({
                content: 'Update succeeded.',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'Update failed: could not find button',
                ephemeral: true,
            });
        }
    }
}

export default UpdateWelcome;
