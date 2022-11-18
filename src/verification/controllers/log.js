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
 * Add a log for a deny-kick
 * @param {TextBasedChannel} logChannel The channel to send to
 * @param {TextBasedChannel} ticket The recently-created ticket
 * @param {GuildMember} target The applicant that was kicked
 * @param {GuildMember} verifier The verifier that kicked them
 * @param {Client} client The client that is sending the log
 * @param {string} userReason The reason sent to the user
 * @param {string} logReason The reason kept in logs
 * @returns {Promise<Message>} The message that was sent
 */
function createDenyKickLog(
    logChannel,
    ticket,
    target,
    verifier,
    client,
    userReason,
    logReason,
    unable,
) {
    // create kick log
    const logEmbed = new EmbedBuilder()
        .setAuthor({
            name: `${target.user.tag}`,
            iconURL: target.user.avatarURL(),
        })
        .setTitle(`The user ${target.user.tag} has been kicked from the server.`)
        .setDescription(`Reason ${unable ? '(Unable to Send to User)' : '(Sent to User)'}: ${codeBlock(userReason)}\nLogs Reason (Not Shared):${codeBlock(logReason)}`)
        .setTimestamp()
        .setFooter({
            text: client.user.tag,
            iconURL: client.user.avatarURL(),
        })
        .addFields([{
            name: 'User Information',
            value: `${target.user.tag} (${target.user.id}) ${userMention(target.user.id)}`,
        },
        {
            name: 'Verifier Information',
            value: `${verifier.user.tag} (${verifier.user.id}) ${userMention(verifier.user.id)}`,
        },
        {
            name: 'ID\'s',
            value: codeBlock('ini', `Verifier = ${verifier.user.id}\nUser = ${target.user.id}\nThread = ${ticket.id}`),
        },
        ]);

    return logChannel.send({
        embeds: [logEmbed],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(channelLink(ticket.parentId, ticket.guildId))
                        .setLabel('View Thread')
                        .setStyle(ButtonStyle.Link),
                ),
        ],
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
            name: applicant.user.tag,
            iconURL: applicant.user.avatarURL(),
        })
        .setDescription(`A new verification ticket has been created for ${applicant.user.tag}`)
        .setTimestamp()
        .setFooter({
            text: client.user.tag,
            iconURL: client.user.avatarURL(),
        })
        .addFields([{
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
    createDenyKickLog,
    createVerifyTicketCreateLog,
    createVerifiedLog,
};
