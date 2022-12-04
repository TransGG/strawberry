import config from '../../config/config.js';
import { createVerifyTicketCreateLog } from '../controllers/log.js';
import { isVerified } from '../controllers/member.js';
import { isClosed, phantomPing, refreshTicket } from '../controllers/ticket.js';
import { createTicket, fetchMostRecentTicket } from '../controllers/tickets.js';

/**
 * Entry point for starting verification
 * @param {GuildTextThreadManager} threads A ThreadManager for the verification ticket channel
 * @param {GuildMember} applicant A guild member
 * @param {function} resolve Success callback. Takes two parameters - thread, applicant
 * @param {function} reject Failure callback. Takes a single parameter - message
 */
async function startVerification(threads, applicant, resolve, reject) {
    // check if user is verified
    if (isVerified(applicant)) {
        await reject('You\'ve already been verified, silly');
        return;
    }

    // fetch existing threads, if any
    const existingTicket = fetchMostRecentTicket(threads, applicant);
    if (existingTicket) {
        const closed = isClosed(existingTicket);
        if (closed) {
            await refreshTicket(existingTicket, applicant);
        }
        await phantomPing(existingTicket, applicant);
        await resolve(
            existingTicket,
            closed ? 'Re-opened your ticket' : 'You already have a thread open',
        );
        return;
    }

    // create new ticket
    const ticket = await createTicket(threads, applicant);
    await createVerifyTicketCreateLog(
        ticket.guild.channels.cache.get(config.channels.verifyLogs),
        ticket,
        applicant,
        threads.client,
    );

    await resolve(ticket, 'Created a ticket for you to verify your account');
}

export default startVerification;
