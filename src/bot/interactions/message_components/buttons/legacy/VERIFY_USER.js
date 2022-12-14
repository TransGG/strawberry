import {
    ButtonBuilder,
    ButtonStyle,
    Events,
} from 'discord.js';
import Button from '../../Button.js';
import { buildPromptComponents } from '../../../../../content/verification.js';
import reemitInteraction from '../../../../utils/reemit.js';

/**
 * Handler for VERIFY_USER button. Verifies a user
 */
class VerifyUser extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     * Must be unique.
     */
    constructor(name = 'VERIFY_USER') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Verify User')
            .setStyle(ButtonStyle.Success);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        // check to see if the message the button is attached to is a prompt on an older version
        if (interaction.message.components[0].components[0].data.custom_id === 'VERIFY_USER'
            && interaction.message.content) {
            await interaction.message.edit({
                components: buildPromptComponents(interaction.client, true),
            });

            await interaction.reply({
                content: 'This action was not performed as the embed buttons were on a older version. Please try again with the new buttons.',
                ephemeral: true,
            });
            return;
        }

        reemitInteraction(
            Events.InteractionCreate,
            interaction,
            interaction.client.getButton('verifyUser'),
        );
    }
}

export default VerifyUser;
