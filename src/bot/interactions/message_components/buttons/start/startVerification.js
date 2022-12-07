import {
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import {
    verbose,
} from '../../../../../config/out.js';
import preStartVerification from '../../select_menus/preStartVerification.js';
import Button from '../../Button.js';
import {
    buildPromptSelectComponents,
} from '../../../../../verification/controllers/ticket.js';

/**
 * Handler for startVerification button. Puts a user into the verification process
 */
class StartVerification extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'startVerification') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Start Verification')
            .setStyle(ButtonStyle.Success);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        verbose(`Request to start pre-verification select for ${interaction.user.tag} ${interaction.member.id}`);
        await interaction.reply({
            content: 'Please select one of the following you best identify with, choosing one option over another will not affect your verification in any way, rather will only slightly change the questions to best fit your identity.',
            components: [
                buildPromptSelectComponents(interaction.client),
            ],
            ephemeral: true,
        });
    }
}

export default StartVerification;
