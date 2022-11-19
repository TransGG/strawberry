import { inlineCode } from 'discord.js';
import { verbose } from '../../config/out.js';
import { archiveTicket, isClosed, sendMessage } from '../controllers/ticket.js';

const closeTypes = {
    verified: 'verified',
    leave: 'leave',
    kick: 'kick',
    ban: 'ban',
    archive: 'archive',
};

/**
 * Closes a verification ticket
 * @param {function} resolve Success callback
 * @param {function} reject Failure callback
 * @param {ThreadChannel} ticket The ticket to be closed
 * @param {string} type The type of close (must match a member of closeTypes)
 */
async function closeTicket(resolve, reject, ticket, type) {
    if (isClosed(ticket)) {
        await reject('Ticket was already archived');
        return;
    }

    let closeMessage;
    let reason;
    switch (type) {
        case closeTypes.verified:
            closeMessage = inlineCode('Ticket closed - user was verified');
            reason = 'User was verified';
            break;
        case closeTypes.leave:
            closeMessage = inlineCode('Ticket closed - user left');
            reason = 'User left server';
            break;
        case closeTypes.kick:
            closeMessage = inlineCode('Ticket closed - user was kicked');
            reason = 'User was kicked';
            break;
        case closeTypes.ban:
            closeMessage = inlineCode('Ticket closed - user was banned');
            reason = 'User was banned';
            break;
        case closeTypes.archive:
            closeMessage = inlineCode('Ticket closed - archive by verifier');
            reason = 'Archived by verifier';
            break;
        default:
            console.error(`Unknown close reason: ${type}`);
            closeMessage = inlineCode('Ticket closed - no reason given');
            reason = 'Unknown reason';
            break;
    }
    verbose(`Closing ticket ${ticket?.id}: ${reason}`);
    await sendMessage(ticket, closeMessage);
    await archiveTicket(ticket, reason);

    await resolve('Closed ticket successfully');
}

export default closeTicket;
export { closeTypes };
