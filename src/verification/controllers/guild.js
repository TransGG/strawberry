/**
 * Fetches a member from a guild
 * @param {Guild} guild The guild to fetch from
 * @param {Snowflake} id The id of the member to fetch
 * @returns {Promise<GuildMember} The guild member with the given id
 */
async function fetchMember(guild, id) {
    return guild.members.fetch(id);
}

/**
 * Ban a user from a guild
 * @param {Guild} guild The guild to ban from
 * @param {UserResolvable} target The user to ban
 * @param {BanOptions} [options] Options for the ban
 * @returns {Promise<GuildMember|User|Snowflake} The resolved user
 */
async function banFromGuild(guild, target, options) {
    return guild.bans.create(target, options);
}

/**
 * Kick a user from a guild
 * @param {Guild} guild The guild to kick from
 * @param {UserResolvable} target The user to kick
 * @param {string} [reason] Reason for kicking
 * @returns {Promise<GuildMember|User|Snowflake} The resolved user
 */
async function kickFromGuild(guild, target, reason) {
    return guild.members.kick(target, reason);
}

// //////////// The line of direct vs indirect ///////////////

export {
    fetchMember,
    banFromGuild,
    kickFromGuild,
};
