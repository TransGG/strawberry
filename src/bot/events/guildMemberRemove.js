import { Events } from 'discord.js';
import Event from '../Event.js';

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
    // eslint-disable-next-line no-unused-vars
    async run(member) {
        // this code always returns before doing anything, so comment it out until we get back to
        // this

        // if (member.user.bot) { return; }

        // // Check if they have a thread open, and if so close it.

        // if (!member.guild.channel) { return; }

        // const existingThread = member.guild.channel.threads.cache.find((x) => {
        //     if (splitUp[1] === member.user.id) { return splitUp[1]; }
        // });

        // if (existingThread && !existingThread.archived) {
        //     existingThread.setArchived(true, 'User left guild, auto archived thread.');
        // }
    }
}

export default GuildMemberRemove;
