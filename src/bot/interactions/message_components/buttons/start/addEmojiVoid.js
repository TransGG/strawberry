import {
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import {
    verbose,
} from '../../../../../config/out.js';
import Button from '../../Button.js';
import config from '../../../../../config/config.js';
import { isClosed } from '../../../../../verification/controllers/ticket.js';
import { fetchMostRecentTicket } from '../../../../../verification/controllers/tickets.js';
import { closeTicket, CloseReason } from '../../../../../verification/managers/closeTicket.js';
/**
 * Handler for AddEmojiVoid button.
 */
class AddEmojiVoid extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'addEmojiVoid') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Emojis Only')
            .setStyle(ButtonStyle.Primary);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        verbose(`Request to go to the emoji void from: ${interaction.user.tag} ${interaction.member.id}`);

        if (!config.guilds[interaction.guild.id].roles.emojiVoid) {
            interaction.reply({
                content: 'Unable to add the emoji void role. Please contact a moderator.',
                ephemeral: true,
            });
        } else if (interaction.member.roles.cache.has(
            config.guilds[interaction.guild.id].roles.emojiVoid,
        )) {
            interaction.reply({
                content: 'You are already in the emoji void. If you believe this is an error, please contact a moderator.',
                ephemeral: true,
            });
        } else if (!interaction.member.roles.cache.has(
            config.guilds[interaction.guild.id].roles.verified,
        )) {
            const ticket = await fetchMostRecentTicket(
                interaction.member.client.channels.cache.get(
                    config.guilds[interaction.guild.id].channels.lobby,
                ).threads,
                interaction.member,
            );

            if (ticket && !isClosed(ticket)) {
                await closeTicket(ticket, CloseReason.emoji);
            }

            interaction.member.roles.add(
                config.guilds[interaction.guild.id].roles.emojiVoid,
            );
            interaction.reply({
                content: 'You have been added to the emoji void. You will not be able to see any messages from other members until you are verified.',
                ephemeral: true,
            });
        } else {
            interaction.reply({
                content: 'You are already verified, this command is only for new users. If you believe this is an error, please contact a moderator.',
                ephemeral: true,
            });
        }
    }
}

export default AddEmojiVoid;
