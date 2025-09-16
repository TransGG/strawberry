import { ButtonBuilder, ButtonStyle } from 'discord.js';
import Button from '../../Button.js';
import { fetchApplicant } from '../../../../../verification/controllers/ticket.js';
import InteractionHelper from '../../../../utils/InteractionHelper.js';

/**
 * Handler for sendAsTheo button. Displays a modal that will send a message
 */
class SendAsTheo extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'sendAsTheo', withPing = false) {
        super(name);
        this.withPing = withPing;
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel(this.withPing ? 'Send as Theo with Ping' : 'Send as Theo')
            .setStyle(ButtonStyle.Secondary);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        const applicant = await fetchApplicant(interaction.channel);

        if (!applicant) {
            await InteractionHelper.reply(
                interaction,
                'The applicant could not be found for this channel (they likely left the server).',
                true,
            );

            return;
        }

        await interaction.showModal(
            interaction.client.getModal(
                this.withPing ? 'sendMessageWithPing' : 'sendMessage',
            ),
        );
    }
}

export default SendAsTheo;
