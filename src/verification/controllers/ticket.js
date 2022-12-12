import {
    BaseGuildTextChannel,
    RESTJSONErrorCodes,
    roleMention,
    ThreadChannel,
    userMention,
} from 'discord.js';
import config from '../../config/config.js';
import { buildMentionVerifiersEmbeds, buildPromptComponents, buildPromptEmbeds } from '../../content/verification.js';
import { matchTrailingSnowflake } from '../../formatters/snowflake.js';

/**
 * Archives a ticket
 * @param {ThreadChannel} ticket A verification ticket
 * @param {string} reason Reason for archiving
 * @returns {Promise<ThreadChannel>} The verification ticket
 */
function archiveTicket(ticket, reason) {
    return ticket.setArchived(true, reason);
}

/**
 * Unarchives a ticket
 * @param {ThreadChannel} ticket A verification ticket
 * @param {string} reason Reason for unarchiving
 * @returns {Promise<ThreadChannel>} The verification ticket
 */
function unarchiveTicket(ticket, reason) {
    return ticket.setArchived(false, reason);
}

/**
 * Sends a message in a ticket
 * @param {TextBasedChannel} ticket The ticket to send to
 * @param {string|MessagePayload|MessageCreateOptions} options The options to provide
 * @returns {Promise<Message>} The message that was sent
 */
function sendMessage(ticket, options) {
    return ticket.send(options);
}

/**
 * Fetches messages of a channel
 * @param {TextBasedChannel} channel A text channel
 * @returns {Promise<Collection<Snowflake, Message>>} All messages in this channel
 */
async function fetchMessages(channel) {
    return channel.messages.fetch();
}

/**
 * Creates a phantom ping (creates a message with a ping and then immediately deletes it)
 * @param {TextBasedChannel} channel A text channel
 * @param {GuildMember|User} recipient A guild member or user
 * @returns {Promise<Message>} The message that was deleted
 */
async function phantomPing(channel, recipient) {
    const message = await channel.send({
        content: userMention(recipient.id),
    });
    return message.delete();
}

// //////////// The line of direct vs indirect ///////////////

/**
 * Parses the id of the user a verification ticket belongs to, given the ticket
 * @param {ThreadChannel|BaseGuildTextChannel|string} ticket A thread that is a verification ticket
 *     or the name of a thread that is a verification ticket
 * @returns {?Snowflake} The ID of the user who the ticket belongs to, or null if no ID was found
 */
function parseApplicantId(ticket) {
    if (ticket instanceof ThreadChannel || ticket instanceof BaseGuildTextChannel) {
        return parseApplicantId(ticket.name);
    }
    if (typeof ticket === 'string' || ticket instanceof String) {
        return matchTrailingSnowflake(ticket)?.at(-1) ?? null;
    }
    throw new TypeError('Invalid type for ticket', { cause: { ticket } });
}

/**
 * Retrieves the applicant for a verification ticket.
 * @param {ThreadChannel} ticket A verification ticket
 * @return {Promise<?GuildMember|?Collection<Snowflake, GuildMember>>} The applicant (should return
 *     only one GuildMember unless you find a way to finesse the fetch method)
 */
async function fetchApplicant(ticket) {
    try {
        return await ticket.guild.members.fetch(parseApplicantId(ticket));
    } catch (error) {
        // catch DiscordApiError Unknown Member and Unknown User (will occur when user not found)
        if (error.code === RESTJSONErrorCodes.UnknownMember
            || error.code === RESTJSONErrorCodes.UnknownUser) {
            return null;
        }
        throw new Error(error.message, { cause: error });
    }
}

/**
 * Determines if a ticket is closed
 * @param {ThreadChannel} ticket A verification ticket
 * @returns {boolean} True if the ticket is closed, false otherwise
 */
function isClosed(ticket) {
    return ticket.archived;
}

/**
 * Determines if a ticket belongs to a member
 * @param {BaseGuildTextChannel|string} ticket A thread that is a verification ticket or the name of
 *     a thread that is a verification ticket
 * @param {GuildMember|User} member A guild member or user
 * @returns {boolean} True if the ticket belongs to member, false otherwise
 */
function isBelongsToMember(ticket, member) {
    return ticket && member && parseApplicantId(ticket) === member.id;
}

/**
 * Determines if a candidate is a ticket
 * @param {any} candidate The candidate to check if it's a ticket
 * @returns {boolean} True if the candidate is a ticket, false otherwise
 */
function isTicket(candidate) {
    return candidate instanceof ThreadChannel
        && parseApplicantId(candidate)
        && candidate.parentId === config.channels.lobby;
}

/**
 * Sends a message for refreshing the ticket
 * @returns {Promise<Message>} The message that was sent
 */
async function sendRefreshMessage(ticket, member) {
    return ticket.send({
        content: `${userMention(member.id)} Your thread has been reopened, please make sure the above questions are filled out correctly then hit the \`Finished Answering!\` button below.`,
        components: buildPromptComponents(ticket.client),
    });
}

/**
 * Prepares an existing ticket for use
 * @param {ThreadChannel} ticket A verification ticket
 * @param {GuildMember} member The member the ticket belongs to
 * @returns {Promise<boolean>} True if the ticket has been unarchived, false otherwise
 */
async function refreshTicket(ticket, member) {
    const { archived } = ticket;
    if (archived) {
        await unarchiveTicket(ticket, 'Unarchive by user');
    }
    await sendRefreshMessage(ticket, member);
    return archived;
}

/**
 * Sends the prompt in a ticket
 * @param {TextBasedChannel} ticket A text channel
 * @param {GuildMember} applicant The applicant
 * @returns {Promise<Message>} The prompt that was sent
 */
function sendPrompt(ticket, applicant) {
    return ticket.send({
        content: userMention(applicant.id),
        embeds: buildPromptEmbeds(applicant),
        components: buildPromptComponents(ticket.client),
    });
}

/**
 * Sends a message that will mention verifiers
 * @param {TextBasedChannel} ticket A verification ticket
 * @param {GuildMember} applicant A guild member
 * @param {Client} client The client sending the verifier mention
 * @param {string} helpMessage A message to display
 * @returns {Promise<Message>} The message that was sent
 */
function sendMentionVerifiers(ticket, applicant, client, helpMessage) {
    const message = roleMention(config.roles.verifier);
    const embeds = buildMentionVerifiersEmbeds(applicant, client, helpMessage);
    return ticket.send({
        content: message,
        embeds,
        allowedMentions: {
            roles: [config.roles.verifier],
        },
    });
}

/**
 * Fetches messages in a verification ticket sent by the applicant
 * @param {TextBasedChannel} ticket A verification ticket
 * @returns {Promise<Collection<Message>>}
 */
async function fetchApplicantMessages(ticket) {
    // if the message count is greater than the cache size, fetch all the messages
    const messages = await fetchMessages(ticket);

    const applicantId = parseApplicantId(ticket);

    return messages.filter((message) => message.author.id === applicantId);
}

/**
 * Gets the total character count of all messages sent by the applicant of a ticket
 * @param {TextBasedChannel} ticket A verification ticket
 * @returns {Promise<number>} The total character count of all messages sent by the applicant
 */
async function getApplicantMessagesLength(ticket) {
    // get applicant messages
    const applicantMessages = await fetchApplicantMessages(ticket);

    // sum the character count of the applicant's messages
    let total = 0;
    applicantMessages.forEach((message) => {
        total += message.content.length;
    });

    return total;
}

/**
 * Determines if a ticket has been answered by an applicant
 * @param {TextBasedChannel} ticket A verification ticket
 * @returns {Promise<boolean>} True if the ticket has answers from the applicant, false otherwise
 */
async function hasApplicantAnswered(ticket) {
    const messageCharacterCountRequirement = 50;

    return await getApplicantMessagesLength(ticket) >= messageCharacterCountRequirement;
}

/**
 * Determines if a ticket has had its applicant ask for help
 * @param {TextBasedChannel} ticket A verification ticket
 * @returns {Promise<boolean>} True if the ticket has answers from the applicant, false otherwise
 */
async function hasApplicantAskedForHelp(ticket) {
    const messageCharacterCountRequirement = 11; // 'i need help'.length

    return await getApplicantMessagesLength(ticket) >= messageCharacterCountRequirement;
}

export {
    archiveTicket,
    sendMessage,
    phantomPing,
    parseApplicantId,
    fetchApplicant,
    isClosed,
    isBelongsToMember,
    isTicket,
    refreshTicket,
    sendPrompt,
    sendMentionVerifiers,
    hasApplicantAnswered,
    hasApplicantAskedForHelp,
};
