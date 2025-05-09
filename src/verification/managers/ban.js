import config from '../../config/config.js';
import { verbose } from '../../config/out.js';
import { banFromGuild } from '../controllers/guild.js';
import { createBanLog } from '../controllers/log.js';
import { attemptDM, isStaff } from '../controllers/member.js';
import { resolveUser } from '../controllers/user.js';
import VerificationError from '../verificationError.js';

/**
 * Bans a User and logs the ban
 * @param {BanOptions} banOptions Options for ban
 * @param {Object} options Options for banning
 * @param {User} options.target The member to ban
 * @param {GuildMember} options.verifier The member who created the ban
 * @param {string} options.userReason The reason sent to the user
 * @param {string} options.logReason The reason kept in logs
 * @param {boolean} options.dmMessage Full message to send to the user. Should likely contain
 *     userReason
 * @param {TextBasedChannel} options.ticket The ticket closed due to the ban
 */
async function ban(
    banOptions,
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
        throw new VerificationError('Cannot ban staff members');
    }
    if (targetAsUser.bot) {
        throw new VerificationError('Cannot ban bots');
    }

    // check if there's a mutex for the user leaving
    if (client.isUserLeaveMutex(targetAsUser.id)) {
        throw new VerificationError('User is being modified due to leaving elsewhere');
    }

    try {
        client.addUserLeaveMutex(targetAsUser.id);
        verbose(`Banning ${targetAsUser?.tag} ${targetAsUser?.id} by verifier ${verifier?.user?.tag}`);

        let dmSent = false;
        if (dmMessage) {
            dmSent = await attemptDM(targetAsUser, dmMessage);
        }

        // ban member and create log
        await Promise.all([
            banFromGuild(
                guild,
                targetAsUser,
                banOptions,
            ),
            createBanLog(
                verifier.guild.channels.cache.get(
                    config.guilds[verifier.guild.id].channels.verifyLogsSecondary,
                ),
                {
                    target: targetAsUser, verifier, client, userReason, logReason, dmSent, ticket,
                },
            ),
        ]);
    } finally {
        client.removeUserLeaveMutex(targetAsUser.id);
    }
}

export default ban;
