import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    channelLink,
    codeBlock,
    EmbedBuilder,
    userMention,
} from 'discord.js';
import buildTimeInfoString from '../utils/stringBuilders.js';

/**
 * Create a log for a ban where the member is passed
 * @param {TextBasedChannel} logChannel The channel to send to
 * @param {Object} options Options for banning
 * @param {User} options.target The member to ban
 * @param {GuildMember} options.verifier The member who created the ban
 * @param {Client} options.client The client that is sending the log
 * @param {string} options.userReason The reason sent to the user
 * @param {string} options.logReason The reason kept in logs
 * @param {boolean} options.dmSent Whether a DM was sent
 * @param {TextBasedChannel} options.ticket The ticket closed due to the ban
 * @returns {Promise<Message>} The message that was sent
 */
function createBanLog(
    logChannel,
    {
        target, verifier, client, userReason, logReason, dmSent, ticket,
    },
) {
    // create embed
    const embed = new EmbedBuilder()
        .setColor(0xed4245) // color-picked from discord
        .setTitle(`The user ${target.tag} has been banned from the server.`)
        .setAuthor({
            name: `${target.tag}`,
            iconURL: `${target.avatarURL()}`,
        })
        .setDescription(`Reason ${dmSent ? '(Sent to User)' : '(Unable to Send to User)'}: ${codeBlock(userReason)}\nLogs Reason (Not Shared):${codeBlock(logReason)}`)
        .addFields([
            {
                name: 'User Information',
                value: `${target.tag} (${target.id}) ${userMention(target.id)}`,
            },
            {
                name: 'Verifier Information',
                value: `${verifier.user.tag} (${verifier.user.id}) ${userMention(verifier.user.id)}`,
            },
            {
                name: 'ID\'s',
                value: codeBlock('ini', `Verifier = ${verifier.user.id}\nUser = ${target.id}${ticket ? `\nThread = ${ticket.id}` : ''}`),
            },
        ])
        .setTimestamp()
        .setFooter({
            text: `${client.user.tag}`,
            iconURL: `${client.user.avatarURL()}`,
        });

    // optionally build button if a link can be built from ticket
    let components;
    if (ticket) {
        components = [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(channelLink(ticket.id, ticket.guildId))
                        .setLabel('View Thread')
                        .setStyle(ButtonStyle.Link),
                ),
        ];
    }

    // create log
    return logChannel.send({
        embeds: [embed],
        components,
    });
}
/**
 * Create a log for a kick
 * @param {TextBasedChannel} logChannel The channel to send to
 * @param {User} target The user that was kicked
 * @param {GuildMember} verifier The verifier that did the kick
 * @param {Client} client The client that is sending the log
 * @param {string} userReason The reason sent to the user
 * @param {string} logReason The reason kept in logs
 * @param {boolean} dmSent Whether a DM was sent
 * @param {TextBasedChannel} [ticket] The ticket closed due to the kick
 * @returns {Promise<Message>} The message that was sent
 */
function createKickLog(
    logChannel,
    {
        target,
        verifier,
        client,
        userReason,
        logReason,
        dmSent,
        ticket,
    },
) {
    // create embed
    const embed = new EmbedBuilder()
        .setTitle(`The user ${target.tag} has been kicked from the server.`)
        .setAuthor({
            name: `${target.tag}`,
            iconURL: `${target.avatarURL()}`,
        })
        .setDescription(`Reason ${dmSent ? '(Sent to User)' : '(Unable to Send to User)'}: ${codeBlock(userReason)}\nLogs Reason (Not Shared):${codeBlock(logReason)}`)
        .addFields([
            {
                name: 'User Information',
                value: `${target.tag} (${target.id}) ${userMention(target.id)}`,
            },
            {
                name: 'Verifier Information',
                value: `${verifier.user.tag} (${verifier.user.id}) ${userMention(verifier.user.id)}`,
            },
            {
                name: 'ID\'s',
                value: codeBlock('ini', `Verifier = ${verifier.user.id}\nUser = ${target.id}${ticket ? `\nThread = ${ticket.id}` : ''}`),
            },
        ])
        .setTimestamp()
        .setFooter({
            text: `${client.user.tag}`,
            iconURL: `${client.user.avatarURL()}`,
        });

    // optionally build button if a link can be built from ticket
    let components;
    if (ticket) {
        components = [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(channelLink(ticket.id, ticket.guildId))
                        .setLabel('View Thread')
                        .setStyle(ButtonStyle.Link),
                ),
        ];
    }

    // create log
    return logChannel.send({
        embeds: [embed],
        components,
    });
}

/**
 * Add a log for the newly created thread
 * @param {TextBasedChannel} logChannel The channel to send to
 * @param {TextBasedChannel} ticket The recently-created ticket
 * @param {GuildMember} applicant The applicant that the ticket belongs to
 * @param {Client} client The client that is sending the log
 * @returns {Promise<Message>} The message that was sent
 */
function createVerifyTicketCreateLog(logChannel, ticket, applicant, client) {
    const now = Date.now();

    const logEmbed = new EmbedBuilder()
        .setAuthor({
            name: `${applicant.user.tag}`,
            iconURL: `${applicant.user.avatarURL()}`,
        })
        .setDescription(`A new verification ticket has been created for ${applicant.user.tag}`)
        .setTimestamp()
        .setFooter({
            text: `${client.user.tag}`,
            iconURL: `${client.user.avatarURL()}`,
        })
        .addFields([
            {
                name: 'User Information',
                value: `${applicant.user.tag} (${applicant.id}) ${userMention(applicant.id)}`,
            },
            {
                name: 'Joined At',
                value: buildTimeInfoString(applicant.joinedAt, now),
            },
            {
                name: 'Created At',
                value: buildTimeInfoString(applicant.user.createdAt, now),
            },
            {
                name: 'ID\'s',
                value: codeBlock('ini', `User = ${applicant.id}\nThread = ${ticket.id}`),
            },
        ]);

    return logChannel.send({
        embeds: [logEmbed],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(channelLink(ticket.id, ticket.guildId))
                        .setLabel('View Thread')
                        .setStyle(ButtonStyle.Link),
                ),
        ],
    });
}

/**
 * Creates a log for when a user gets verified
 * @param {BaseChannel} logChannel The channel to send logs in
 * @param {GuildMember} verifier The id of the verifier
 * @param {GuildMember} applicantId The id of the member who was verified
 * @returns {Promise<Message>} The message that was sent
 */
function createVerifiedLog(logChannel, verifier, applicant) {
    return logChannel.send({
        content: `${userMention(verifier.id)} verified ${userMention(applicant.id)}.`,
        allowedMentions: {
            parse: [],
        },
    });
}

export {
    createBanLog,
    createKickLog,
    createVerifyTicketCreateLog,
    createVerifiedLog,
};
