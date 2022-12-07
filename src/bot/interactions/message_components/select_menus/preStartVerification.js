import {
    SelectMenuBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    channelLink,
} from 'discord.js';
import SelectMenu from '../SelectMenu.js';
import { verbose } from '../../../../config/out.js';
import startVerification from '../../../../verification/managers/startVerification.js';

/**
 * Handler for preStartVerification select menu.
 */
class preStartVerification extends SelectMenu {
    /**
     * @param {string} name The name to use to identify this select menu and to serve as its
     *     customId. Must be unique.
     */
    constructor(name = 'preStartVerification') {
        super(name);
    }

    /**
     * @returns {SelectMenuBuilder} The data that describes the select menu format to the Discord
     *     API.
     */
    getData() {
        return new SelectMenuBuilder()
            .setCustomId(this.name)
            .setPlaceholder('Placeholder Text')
            .addOptions([{
                label: 'Trans / Enby',
                description: 'Do you identify as trans / enby?',
                value: 'isTrans',
            },
            {
                label: 'Cis + LGBTQ+',
                description: 'Do you identify as Cis + LGBTQ+',
                value: 'isCisAndLGBTQ',
            },
            {
                label: 'Cis non LGBTQ+',
                description: 'Do you identify as only cis?',
                value: 'isCisNonLGBTQ',
            },
            ]);
    }

    /**
     * Method to run when this select menu is used
     * @param {SelectMenuInteraction} interaction The interaction that was emitted when this select
     *     menu was used
     */
    async run(interaction) {
        await interaction.reply({
            content: `You selected ${interaction.values.join(', ')}!`,
            ephemeral: true,
        });

        verbose(`Request to start verification in channel ${interaction.channel.id} for ${interaction.user.tag} ${interaction.member.id}`);

        // start verification
        await startVerification(
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
                content: message || ('Failed to start verification: no reason given. Please contact a staff member' && console.error(`Rejection w/o reason when starting verification in channel ${interaction.channel.id} for ${interaction.user.tag} ${interaction.member.id}`)),
                ephemeral: true,
            }),
            interaction.channel.threads,
            interaction.member,
            interaction.values,
        );
    }
}

export default preStartVerification;
