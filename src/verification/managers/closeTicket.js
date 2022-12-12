import { inlineCode } from 'discord.js';
import { verbose } from '../../config/out.js';
import { archiveTicket, isClosed, sendMessage } from '../controllers/ticket.js';
import VerificationError from '../verificationError.js';

const CloseReason = Object.freeze({
    unknown: Symbol('unknown'),
    verified: Symbol('verified'),
    leave: Symbol('leave'),
    kick: Symbol('kick'),
    ban: Symbol('ban'),
    archive: Symbol('archive'),
});

const closeMessages = {
    [CloseReason.unknown]: inlineCode('Ticket closed - no reason given'),
    [CloseReason.verified]: inlineCode('Ticket closed - user was verified'),
    [CloseReason.leave]: inlineCode('Ticket closed - user left'),
    [CloseReason.kick]: inlineCode('Ticket closed - user was kicked'),
    [CloseReason.ban]: inlineCode('Ticket closed - user was banned'),
    [CloseReason.archive]: inlineCode('Ticket closed - archive by verifier'),
};

const closeReasons = {
    [CloseReason.unknown]: 'Unknown reason',
    [CloseReason.verified]: 'User was verified',
    [CloseReason.leave]: 'User left server',
    [CloseReason.kick]: 'User was kicked',
    [CloseReason.ban]: 'User was banned',
    [CloseReason.archive]: 'Archived by verifier',
};

/**
 * Resolves a type into a matching element of closeTypes or the unknown closeType if type doesn't
 * match any element.
 * @param {any} reason The reason to resolve
 * @returns {Symbol} A CloseReason
 */
function resolveReason(reason) {
    return (reason && Object.values(CloseReason).includes(reason)) ? reason : CloseReason.unknown;
}

/**
 * Closes a verification ticket
 * @param {ThreadChannel} ticket The ticket to be closed
 * @param {number} closeReason The reason for closing (must be a CloseReason)
 * @throws {Error} If the ticket was already closed
 */
async function closeTicket(ticket, closeReason) {
    if (isClosed(ticket)) {
        throw new VerificationError('Ticket was already archived');
    }

    const resolvedReason = resolveReason(closeReason);

    verbose(`Closing ticket ${ticket?.id}: ${closeReasons[resolvedReason]}`);
    await sendMessage(ticket, closeMessages[resolvedReason]);
    await archiveTicket(ticket, closeReasons[resolvedReason]);
}

export { closeTicket, CloseReason };
