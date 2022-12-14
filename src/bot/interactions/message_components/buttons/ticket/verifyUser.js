import {
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import Button from '../../Button.js';
import verifyUser from '../../../../../verification/managers/verifyUser.js';

/**
 * Handler for verifyUser button. Verifies a user
 */
class VerifyUser extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     * Must be unique.
     */
    constructor(name = 'verifyUser') {
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
        await verifyUser(
            interaction.channel,
            interaction.member,
            (message) => interaction.reply({
                content: message,
                allowedMentions: {
                    parse: [],
                },
            }),
            (message) => interaction.reply({
                content: message || 'Verification failed: no message given',
                ephemeral: true,
            }),
        );
    }
}

export default VerifyUser;
