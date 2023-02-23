import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';

import { buildWelcomeComponents, welcomeEmbeds } from '../../../../content/welcome.js';
import InteractionHelper from '../../../utils/InteractionHelper.js';
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
        if (interaction.targetMessage.components[0].components[1].data.custom_id === 'startVerification') {
            await InteractionHelper.deferReply(interaction, true);

            const components = buildWelcomeComponents(interaction.client);
            await interaction.targetMessage.edit({
                embeds: welcomeEmbeds,
                components,
            });

            await InteractionHelper.send(interaction, 'Update succeeded.');
        } else {
            await InteractionHelper.send(
                interaction,
                'Update failed: Could not identify target message as welcome message',
                true,
            );
        }
    }
}

export default UpdateWelcome;
