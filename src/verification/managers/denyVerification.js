import { bold, codeBlock } from 'discord.js';
import { verbose } from '../../config/out.js';
import { parseApplicantId } from '../controllers/ticket.js';
import { fetchUser, resolveUser } from '../controllers/user.js';
import VerificationError from '../verificationError.js';
import ban from './ban.js';
import { closeTicket, CloseReason } from './closeTicket.js';
import kick from './kick.js';

const DenyConsequence = Object.freeze({
    unknown: Symbol('unknown'),
    none: Symbol('none'),
    kick: Symbol('kick'),
    ban: Symbol('ban'),
});

/**
 * Denies an applicant's verification/kicks an active applicant
 * @param {number} consequence The consequence to denial. Choose from consequenceTypes
 * @param {Object} options The options for denial
 * @param {ThreadChannel} options.ticket A verification ticket
 * @param {GuildMember} options.verifier The verifier who denied the application
 * @param {string} options.userReason The reason sent to the user
 * @param {string} options.logReason The reason kept in logs
 * @param {User} [options.applicant] The user whose verification ticket is being denied
 * @param {function} resolve Success callback function. Takes a single parameter - message
 */
async function denyVerification(
    consequence,
    {
        ticket, verifier, userReason, logReason, applicant,
    },
    resolve,
) {
    // infer guild and client from verifier
    const { guild, client } = verifier;

    // get a User that represents the target
    const applicantAsUser = await resolveUser(applicant, client)
        ?? await fetchUser(parseApplicantId(ticket), client);

    verbose(`Denial of ticket ${ticket?.id} for applicant ${applicantAsUser?.tag} ${applicantAsUser?.id} by verifier ${verifier?.user?.tag}`);

    if (consequence === DenyConsequence.kick) {
        if (!applicantAsUser) {
            throw new VerificationError('User is not in the server');
        }

        await kick(
            'Member was kicked during verification',
            {
                target: applicantAsUser,
                verifier,
                userReason,
                logReason,
                dmMessage: `Your verification ticket within ${bold(guild.name)} has been denied for the following reason:\n${codeBlock(userReason)}`,
                ticket,
            },
        );

        if (resolve) {
            await resolve(`Kicked ${applicantAsUser.tag} from the server.`);
        }
    } else if (consequence === DenyConsequence.ban) {
        if (!applicantAsUser) {
            throw new VerificationError('Unable to resolve user');
        }

        await ban(
            { reason: 'Member was banned during verification' },
            {
                target: applicantAsUser,
                verifier,
                userReason,
                logReason,
                dmMessage: `Your verification ticket within ${bold(guild.name)} has been denied for the following reason:\n${codeBlock(userReason)}`,
                ticket,
            },
        );

        await resolve(`Banned ${applicantAsUser.tag} from the server.`);
    }

    // close ticket (occurs after resolve so the ticket may be modified during the resolution)
    let closeType;
    switch (consequence) {
        case DenyConsequence.kick:
            closeType = CloseReason.kick;
            break;
        case DenyConsequence.ban:
            closeType = CloseReason.ban;
            break;
        default:
            closeType = CloseReason.unknown;
            break;
    }
    await closeTicket(ticket, closeType);
}

export { denyVerification, DenyConsequence };
