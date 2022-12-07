import config from '../../config/config.js';
import { isBelongsToMember, sendPrompt } from './ticket.js';

/**
 * Creates the thread for a verification ticket for a member
 * @param {GuildTextThreadManager} threads The thread manager for verification tickets
 * @param {GuildMember} member A guild member
 * @returns {Promise<ThreadChannel>} The thread that was created
 */
function createThread(threads, member) {
    return threads.create({
        invitable: false,
        name: `${member.user.tag} | ${member.user.id}`,
        autoArchiveDuration: config.verifyTicketAutoArchiveDuration,
        reason: 'Thread for verifying a user',
        type: config.privateThread,
    });
}

/**
 * Creates a verification ticket for a member.
 * @param {GuildTextThreadManager} threads The thread manager for verification tickets
 * @param {GuildMember} applicant A guild member
 * @param {String} type The type of verification to start (based from the pre verification stage)
 * @returns {Promise<ThreadChannel} The ticket that was created
 */
async function createTicket(threads, applicant, type) {
    const thread = await createThread(threads, applicant);
    await sendPrompt(thread, applicant, type);
    return thread;
}

// /**
//  * Finds any existing tickets of a member, if any
// eslint-disable-next-line max-len
//  * @param {GuildTextThreadManager} threads A GuildTextThreadManager that contains possible tickets
//  *     for the member
//  * @param {GuildMember} member A guild member
//  * @returns {Promise<?Collection<ThreadChannel>>} Threads belonging to the member
//  */
// function fetchMemberTickets(threads, member) {
//     // TODO
// }

/**
 * Finds the most recent existing ticket of a member, if any
 * @param {GuildTextThreadManager} threads A GuildTextThreadManager that contains possible tickets
 *     for the member
 * @param {GuildMember} member A guild member
 * @returns {?ThreadChannel} A ticket that is the most recent existing one belonging to the member
 */
function fetchMostRecentTicket(threads, member) {
    return threads.cache.find((thread) => isBelongsToMember(thread, member));
}

export {
    createTicket,
    // fetchMemberTickets,
    fetchMostRecentTicket,
};
