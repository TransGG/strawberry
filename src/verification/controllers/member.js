import { GuildMember, RESTJSONErrorCodes } from 'discord.js';
import config from '../../config/config.js';

/**
 * Assigns a role based on an id. The role for the given id must exist in the guild the member is a
 * part of.
 * @param {GuildMember} member The member to assign a role to
 * @param {string} id The id of the role to assign
 * @returns {Promise<GuildMember>} The guild member
 */
async function assignRole(member, id) {
    const role = await member.guild.roles.fetch(id);
    return member.roles.add(role);
}

/**
 * Kicks a guild member
 * @param {GuildMember} member A guild member
 * @param {string} reason Reason for kicking user
 * @returns {Promise<GuildMember>} The member that was kicked
 */
function kickMember(member, reason) {
    return member.kick(reason);
}

/**
 * Bans a guild member
 * @param {GuildMember} member A guild member
 * @param {Object} [options] Options for the ban
 * @param {number} [options.deleteMessageSeconds] Number of seconds of messages to delete, must
 *     be between 0 and 604800 (7 days), inclusive
 * @param {string} [options.reason] The reason for the ban
 * @returns {Promise<GuildMember>} The member that was kicked
 */
function banMember(member, options) {
    return member.ban(options);
}

/**
 * Sends a direct message to a recipient
 * @param {GuildMember|User} recipient The recipient of the direct message
 * @param {string|MessagePayload|MessageCreateOptions} options The options to provide
 * @returns {Promise<Message>} The message that was sent
 */
function sendDM(recipient, options) {
    return recipient.send(options);
}

/**
 * Resolves a GuildMemberResolvable to a GuildMember
 * @param {GuildMemberResolvable} member The user to resolve
 * @param {Guild} guild The guild that the user is in
 * @returns {Promise<?GuildMember>} The resolved GuildMember or null none was resolved
 */
function resolveMember(member, guild) {
    if (member instanceof GuildMember) {
        return member;
    }

    return guild.members.fetch(member).catch(() => null);
}

// //////////// The line of direct vs indirect ///////////////

/**
 * Attempts to send a direct message to a recipient and returns the success or failure
 * @param {GuildMember|User} recipient The recipient of the direct message
 * @param {string|MessagePayload|MessageCreateOptions} options The options to provide
 * @returns {Promise<boolean>} True if the message was successfully sent, false otherwise
 */
async function attemptDM(recipient, options) {
    if (!recipient) {
        return false;
    }

    try {
        await sendDM(recipient, options);
        return true;
    } catch (error) {
        if (error.code === RESTJSONErrorCodes.CannotSendMessagesToThisUser) {
            return false;
        }

        // I don't know all possible failures so assume all other errors are a failure to DM
        console.error('Unknown error encountered when sending DM:');
        console.error(error);
        return false;
    }
}

/**
 * Determines if a user is on staff
 * @param {GuildMember|User|Snowflake} member The user to check if they are staff
 * @param {Guild} guild The guild that the user might be staff of
 * @returns {Promise<boolean>} True if the user is staff, false otherwise
 */
async function isStaff(member, guild) {
    const resolvedMember = await resolveMember(member, guild);

    return resolvedMember?.roles && resolvedMember.roles.cache.some(
        (role, roleId) => config.roles.staffRoles.includes(roleId),
    );
}

/**
 * Determines if a member is verified
 * @param {GuildMember} member A member in the guild
 * @returns Whether the user is verified
 */
function isVerified(member) {
    return member.roles.cache.has(config.roles.verified);
}

/**
 * Determines if a member is a verifier
 * @param {GuildMember} member A member in the guild
 * @returns {boolean} Whether the user is a verifier
 */
function isVerifier(member) {
    return member.roles.cache.has(config.roles.verifier);
}

export {
    assignRole,
    kickMember,
    banMember,
    sendDM,
    attemptDM,
    isStaff,
    isVerified,
    isVerifier,
};
