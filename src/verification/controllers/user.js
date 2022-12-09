import {
    GuildMember,
    Message,
    RESTJSONErrorCodes,
    ThreadMember,
    User,
} from 'discord.js';
import { isSnowflake } from '../../formatters/snowflake.js';

// //////////// The line of direct vs indirect ///////////////

/**
 * Determines if a user is a UserResolvable
 * @param user The user to examine
 * @returns {boolean} True if the user is a UserResolvable, false otherwise
 */
function isUserResolvable(user) {
    return user instanceof User
        || user instanceof GuildMember
        || user instanceof ThreadMember
        || user instanceof Message
        || isSnowflake(user);
}

/**
 * Coerces a UserResolvable that is not a Snowflake to a User
 * @param {User|GuildMember|ThreadMember|Message} user The user to coerce
 * @returns {?User}
 */
function coerceToUser(user) {
    if (user instanceof User) {
        return user;
    }
    if (user instanceof GuildMember || user instanceof ThreadMember) {
        return user.user;
    }
    if (user instanceof Message) {
        return user.author;
    }
    return null;
}

/**
 * Obtains a user from Discord, or the user cache if it's already available.
 * @param {UserResolvable} user The user to fetch
 * @returns {Promise<?User>} The user that was fetched or null if none was found
 */
async function fetchUser(user, client) {
    try {
        return await client.users.fetch(user);
    } catch (error) {
        // catch DiscordApiError Unknown User (will occur when user not found)
        if (error.code === RESTJSONErrorCodes.UnknownUser) {
            return null;
        }
        throw new Error(error.message, { cause: error });
    }
}

/**
 * Resolves a UserResolvable to a User. Will fetch from API iff client is passed and user is a
 * Snowflake.
 * @param {UserResolvable} user The UserResolvable to identify
 * @param {Client} client The client to fetch from the Discord API with. Only used if user is a
 *     Snowflake
 * @returns {Promise<?User>} The user or null if the user was not resolved
 */
async function resolveUser(user, client) {
    const coercedUser = coerceToUser(user);
    if (coercedUser) {
        return coercedUser;
    }
    if (client && isSnowflake(user)) {
        return fetchUser(user, client);
    }
    return null;
}

/**
 * Resolves a UserResolvable to a User id
 * @param {UserResolvable} user The UserResolvable to identify
 * @returns {?Snowflake} The user's id or null if the id was not resolved
 */
function resolveUserId(user) {
    const coercedUser = coerceToUser(user);
    if (coercedUser) {
        return coercedUser;
    }
    if (isSnowflake(user)) {
        return user;
    }
    return null;
}

export {
    isUserResolvable,
    coerceToUser,
    fetchUser,
    resolveUser,
    resolveUserId,
};
