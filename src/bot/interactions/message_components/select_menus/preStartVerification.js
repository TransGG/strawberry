import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    channelLink,
    StringSelectMenuBuilder,
} from 'discord.js';

import { verbose } from '../../../../config/out.js';
import { buildOptions } from '../../../../content/questions.js';
import startVerification from '../../../../verification/managers/startVerification.js';
import InteractionHelper from '../../../utils/InteractionHelper.js';
import SelectMenu from '../SelectMenu.js';

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
     * @returns {StringSelectMenuBuilder} The data that describes the menu format to the Discord
     *     API.
     */
    getData() {
        return new StringSelectMenuBuilder()
            .setCustomId(this.name)
            .setPlaceholder('What do you identify as?')
            .addOptions(buildOptions());
    }

    /**
     * Method to run when this select menu is used
     * @param {SelectMenuInteraction} interaction The interaction that was emitted when this select
     *     menu was used
     */
    async run(interaction) {
        verbose(`Request to start verification in channel ${interaction.channel.id} for ${interaction.user.tag} ${interaction.member.id}`);
        await InteractionHelper.deferReply(interaction, true);

        // start verification
        await startVerification(
            interaction.channel.threads,
            interaction.member,
            (ticket, message) => {
                verbose(`Created ticket with id ${ticket.id} for ${interaction.user.tag} ${interaction.member.id}`);
                return InteractionHelper.reply(
                    interaction,
                    {
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
                    },
                );
            },
            (message) => interaction.editReply({
                content: message
                    || ('Failed to start verification: no reason given. Please contact a staff member'
                        && console.error(`Rejection w/o reason when starting verification in channel ${interaction.channel.id} for ${interaction.user.tag} ${interaction.member.id}`)),
            }),
            interaction.values[0],
        );
    }
}

export default preStartVerification;
