import { bold, codeBlock } from 'discord.js';
import config from '../../config/config.js';
import { createDenyKickLog } from '../controllers/log.js';
import { kick, sendDM } from '../controllers/member.js';
import { archiveTicket, fetchApplicant } from '../controllers/ticket.js';

/**
 * Denies an applicant's verification/kicks an active applicant
 * @param {function} resolve Success callback function. Takes a single parameter - message
 * @param {function} reject Failure callback function. Takes a single parameter - message
 * @param {ThreadChannel} ticket A verification ticket
 * @param {string} userReason The reason sent to the user
 * @param {string} logReason The reason kept in logs
 */
async function denyKick(resolve, reject, ticket, verifier, userReason, logReason) {
    // check that applicant is in the server
    const applicant = await fetchApplicant(ticket);
    if (!applicant) {
        await reject('User is not in the server');
        return;
    }

    // DM the user with the reason
    let unable = false;
    await sendDM(
        applicant,
        `Your verification ticket within ${bold(ticket.guild.name)} has been denied for the following reason:\n${codeBlock(userReason)}`,
    ).catch(() => { unable = true; });

    // kick applicant
    await kick(applicant, 'Member was kicked during verification');

    // create log
    await createDenyKickLog(
        ticket.guild.channels.cache.get(config.channels.verifyLogsSecondary),
        ticket,
        applicant,
        verifier,
        ticket.client,
        userReason,
        logReason,
        unable,
    );

    // success
    await resolve(`Kicked ${applicant.user.tag} from the server.`);

    await archiveTicket(ticket, 'Member was kicked during verification');
}

export default denyKick;
