import {
    ActionRowBuilder,
    BaseGuildTextChannel,
    EmbedBuilder,
    RESTJSONErrorCodes,
    roleMention,
    ThreadChannel,
    userMention,
} from 'discord.js';
import config from '../../config/config.js';
import { matchSnowflakes } from '../../formatters/snowflake.js';
import buildTimeInfoString from '../utils/stringBuilders.js';

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
 * Parses the id of the user a verification ticket belongs to, given the ticket
 * @param {ThreadChannel|BaseGuildTextChannel|string} ticket A thread that is a verification ticket
 *     or the name of a thread that is a verification ticket
 * @returns {Snowflake} The ID of the user who the ticket belongs to
 */
function parseApplicantId(ticket) {
    if (ticket instanceof ThreadChannel || ticket instanceof BaseGuildTextChannel) {
        return parseApplicantId(ticket.name);
    } if (typeof ticket === 'string' || ticket instanceof String) {
        return matchSnowflakes(ticket).at(-1);
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
 * Determines if a ticket belongs to a member
 * @param {BaseGuildTextChannel|string} ticket A thread that is a verification ticket or the name of
 *     a thread that is a verification ticket
 * @param {GuildMember|User} member A guild member or user
 * @returns {boolean} True if the ticket belongs to member, false otherwise
 */
function isBelongsToMember(ticket, member) {
    return parseApplicantId(ticket) === member.id;
}

/**
 * Creates the components for a verification ticket prompt
 * @param {Bot} client A client from which components can be retrieved
 * @param {boolean} [mentionVerifiersDisabled=false] Whether to disable the mention verifiers
 *     buttons
 * @returns {ActionRowBuilder} An array of action rows containing the components
 */
function buildPromptComponents(client, mentionVerifiersDisabled = false) {
    return new ActionRowBuilder()
        .addComponents(
            client.getButton('verifierActions'),
            client.getButton('mentionVerifiers').addArgs(1).setDisabled(mentionVerifiersDisabled),
            client.getButton('mentionVerifiers').addArgs(2).setDisabled(mentionVerifiersDisabled),
        );
}

/**
 * Sends a message for refreshing the ticket
 * @returns {Promise<Message>} The message that was sent
 */
async function sendRefreshMessage(ticket, member) {
    return ticket.send({
        content: `${userMention(member.id)} Your thread has been reopened, please make sure the above questions are filled out correctly then hit the \`Finished Answering!\` button below.`,
        components: [buildPromptComponents(ticket.client)],
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
 * Builds embeds for a prompt.
 * @param {GuildMember} applicant The applicant
 * @returns {EmbedBuilder[]} The embeds for a prompt
 */
function buildPromptEmbeds(applicant) {
    // TODO: read the questions from a file
    return [
        new EmbedBuilder()
            .setTitle(`Verification Ticket for ${applicant.user.tag}`)
            .setDescription(`Hi! Thank you for your patience with the verification process. As a part of the verification process, we ask that you answer the following questions. Do note that there are no right or wrong to answers these questions, but please try and give thorough / detailed responses. 
    
***Please keep in mind that 1-5 word / simple answers will oftentimes require more questions to have you verified, please try and give thoughtful / detailed responses to be verified quicker, no need to stress however if you cannot think of anything else to put, on behalf of our verification team thank you.*** :heart:

\`\`\`markdown
1. Do you agree to the server rules and to respect the Discord Community Guidelines & Discord ToS?

2. Do you identify as transgender; and/or any other part of the LGBTQ+ community? (Please be specific in your answer)

3. Do you have any friends who are already a part of our Discord? (If yes, please send their username)

4. What’s your main goal / motivation in joining the TransPlace Discord?

5. If you could change one thing about the dynamic of the LGBTQ+ community, what would it be? 

6. What is gatekeeping in relation to the trans community?

# If you have any social media that contains relevant post history related to the LGBTQ+ community, please link it to your discord account or send the account name or URL. 

*(We may use this to help fast track your verification, but linking/sharing any accounts is not required)\`\`\`
***If you need any help please click the "I Need Help Please." button and our verifiers will be added to your thread to help you.\nAfter you have answered all of the questions, please click the "Finished Answering!" button below which will add our verifier staff to your thread.***`)
            .setFooter({ text: 'After answering these questions, a member of the Verification Team may reach out if the answers to the above questions are incomplete or too vague. Thank you again for your patience and we can’t wait for you to join the TransPlace Discord.' }),
    ];
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
        components: [buildPromptComponents(ticket.client)],
    });
}

/**
 * Sends a message that will mention verifiers
 * @param {TextBasedChannel} ticket A verification ticket
 * @param {GuildMember} applicant A guild member
 * @param {Client} client
 * @param {string} helpMessage A message to display
 * @returns {Promise<Message>} The message that was sent
 */
function sendMentionVerifiers(ticket, applicant, client, helpMessage) {
    // create log
    // create now so that joined at and created at use the same value for their calculation
    const now = Date.now();

    // create log embed
    const message = roleMention(config.roles.verifier);
    const embeds = [
        new EmbedBuilder()
            .setAuthor({
                name: applicant.user.tag,
                iconURL: applicant.user.avatarURL(),
            })
            .setDescription(`${roleMention(config.roles.verifier)} ${helpMessage} ${applicant.user.tag}`)
            .setTimestamp()
            .setFooter({
                text: client.user.tag,
                iconURL: client.user.avatarURL(),
            })
            .addFields(
                {
                    name: 'Joined At',
                    value: buildTimeInfoString(applicant.joinedAt, now),
                },
                {
                    name: 'Created At',
                    value: buildTimeInfoString(applicant.user.createdAt, now),
                },
            ),
    ];
    return ticket.send({
        content: message,
        embeds,
        allowedMentions: {
            roles: [config.roles.verifier],
        },
    });
}

/**
 * Determines if a ticket has been answered by an applicant
 * @param {TextBasedChannel} ticket A verification ticket
 * @returns True if the ticket has answers from the applicant, false otherwise
 */
async function isApplicantAnswered(ticket) {
    return (await fetchMessages(ticket))?.size > 1;
}

export {
    archiveTicket,
    parseApplicantId,
    fetchApplicant,
    isBelongsToMember,
    buildPromptComponents,
    refreshTicket,
    sendPrompt,
    sendMentionVerifiers,
    isApplicantAnswered,
    phantomPing,
};
