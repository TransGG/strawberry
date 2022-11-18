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
function kick(member, reason) {
    return member.kick(reason);
}

/**
 * Sends a direct message to the recipient
 * @param {GuildMember|User} recipient The recipient of the direct message
 * @param {string|MessagePayload|MessageCreateOptions} options The options to provide
 * @returns {Promise<Message} The message that was sent
 */
function sendDM(recipient, options) {
    return recipient.send(options);
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
    kick,
    sendDM,
    isVerified,
    isVerifier,
};
