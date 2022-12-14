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
        verbose(`Request to start verification in channel ${interaction.channel.id} for ${interaction.user.tag} ${interaction.member.id}`);

        // start verification
        await startVerification(
            interaction.channel.threads,
            interaction.member,
            (ticket, message) => {
                verbose(`Created ticket with id ${ticket.id} for ${interaction.user.tag} ${interaction.member.id}`);
                return interaction.reply({
                    content: message,
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setURL(channelLink(ticket.id, ticket.guildId))
                                    .setLabel('View Thread')
                                    .setStyle(ButtonStyle.Link),
                            ),
                    ],
                    ephemeral: true,
                });
            },
            (message) => interaction.reply({
                content: message
                    || ('Failed to start verification: no reason given. Please contact a staff member'
                        && console.error(`Rejection w/o reason when starting verification in channel ${interaction.channel.id} for ${interaction.user.tag} ${interaction.member.id}`)),
                ephemeral: true,
            }),
        );
    }
}

export default StartVerification;
