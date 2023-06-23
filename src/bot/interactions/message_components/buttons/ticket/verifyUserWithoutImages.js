import { ButtonBuilder, ButtonStyle } from 'discord.js';

import verifyUser from '../../../../../verification/managers/verifyUser.js';
import InteractionHelper from '../../../../utils/InteractionHelper.js';
import Button from '../../Button.js';

/**
 * Handler for verifyUserWithoutImages button. Verifies a user
 */
class verifyUserWithoutImages extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     * Must be unique.
     */
    constructor(name = 'verifyUserWithoutImages') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Verify User Without Images')
            .setStyle(ButtonStyle.Success);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        await InteractionHelper.deferReply(interaction);

        await verifyUser(
            interaction.channel,
            interaction.member,
            (message) => InteractionHelper.reply(
                interaction,
                {
                    content: message,
                    allowedMentions: {
                        parse: [],
                    },
                },
            ),
            (message) => InteractionHelper.reply(
                interaction,
                message || 'Verification failed: no message given',
                true,
            ),
            'noImages',
        );
    }
}

export default verifyUserWithoutImages;
