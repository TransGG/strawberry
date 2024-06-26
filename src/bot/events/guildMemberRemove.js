import { AuditLogEvent, Events } from 'discord.js';
import config from '../../config/config.js';
import { isClosed } from '../../verification/controllers/ticket.js';
import { fetchMostRecentTicket } from '../../verification/controllers/tickets.js';
import { closeTicket, CloseReason } from '../../verification/managers/closeTicket.js';
import Event from '../Event.js';

/**
 * Determines if the member was removed due to a kick
 * @param {GuildMember} member The member to determine the leave state of
 * @returns {Promise<boolean>} True if the member was removed due to a kick, false otherwise
 */
async function isMemberWasKicked(member) {
    const kickLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MemberKick,
    });

    const kickLog = kickLogs.entries.first();

    return kickLog && kickLog.target.id === member.user.id && kickLog.createdAt > member.joinedAt;
}

/**
 * Determines if the member was removed due to a ban
 * @param {GuildMember} member The member to determine the leave state of
 * @returns {Promise<boolean>} True if the member was removed due to a ban, false otherwise
 */
async function isMemberWasBanned(member) {
    const banLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MemberBanAdd,
    });

    const banLog = banLogs.entries.first();

    return banLog && banLog.target.id === member.user.id && banLog.createdAt > member.joinedAt;
}

/**
 * Determines if a member left voluntarily (not banned or kicked)
 * @param {GuildMember} member The member to determine the leave state of
 * @returns {Promise<boolean>} True if the member left voluntarily, false otherwise
 */
async function isMemberLeftVoluntary(member) {
    // member left voluntarily if member was not kicked and not banned
    if (!(await isMemberWasKicked(member)) && !(await isMemberWasBanned(member))) {
        return true;
    }

    return false;
}

/**
 * Handler for guildMemberRemove event. Event occurs when a guild member leaves the guild, whether
 * it be a voluntary leave, kick, or ban.
 */
class GuildMemberRemove extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.GuildMemberRemove) {
        super(client, name);
    }

    /**
     * @param {GuildMember} member The member that was removed
     */
    async run(member) {
        if (!this.client.isUserLeaveMutex(member.user.id)) {
            try {
                this.client.addUserLeaveMutex(member.user.id);
                const ticket = await fetchMostRecentTicket(
                    member.client.channels.cache.get(config.guilds[member.guild.id].channels.lobby).threads,
                    member,
                );

                if (ticket && !isClosed(ticket) && await isMemberLeftVoluntary(member)) {
                    await closeTicket(ticket, CloseReason.leave);
                }
            } finally {
                this.client.removeUserLeaveMutex(member.user.id);
            }
        }
    }
}

export default GuildMemberRemove;
