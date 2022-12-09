import config from '../../config/config.js';
import { verbose } from '../../config/out.js';
import { kickFromGuild } from '../controllers/guild.js';
import { createKickLog } from '../controllers/log.js';
import { attemptDM, isStaff } from '../controllers/member.js';
import { resolveUser } from '../controllers/user.js';
import VerificationError from '../verificationError.js';

/**
 * Kicks a GuildMember and logs the kick
 * @param {string} kickReason Reason for kick (for audit logs)
 * @param {Object} options Options for kicking
 * @param {User} options.target The member to kick
 * @param {GuildMember} options.verifier The member created the kick
 * @param {string} options.userReason The reason sent to the user
 * @param {string} options.logReason The reason kept in logs
 * @param {boolean} options.dmMessage Full message to send to the user. Should likely contain
 *     userReason
 * @param {TextBasedChannel} options.ticket The ticket closed due to the kick
 */
async function kick(
    kickReason,
    {
        target, verifier, userReason, logReason, dmMessage, ticket,
    },
) {
    // infer guild and client from verifier
    const { guild, client } = verifier;

    // resolve user
    const targetAsUser = await resolveUser(target, client);

    // don't kick if the target is staff or a bot
    if (await isStaff(targetAsUser, guild)) {
        throw new VerificationError('Cannot kick staff members');
    }
    if (targetAsUser.bot) {
        throw new VerificationError('Cannot kick bots');
    }

    verbose(`Kicking ${targetAsUser?.tag} ${targetAsUser?.id} by verifier ${verifier?.user?.tag}`);

    let dmSent = false;
    if (dmMessage) {
        dmSent = await attemptDM(targetAsUser, dmMessage);
    }

    // kick member and create log
    await Promise.all([
        kickFromGuild(
            guild,
            targetAsUser,
            kickReason,
        ),
        createKickLog(
            verifier.guild.channels.cache.get(config.channels.verifyLogsSecondary),
            {
                target: targetAsUser, verifier, client, userReason, logReason, dmSent, ticket,
            },
        ),
    ]);
}

export default kick;
