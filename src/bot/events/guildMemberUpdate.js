import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    channelLink,
    Events,
} from 'discord.js';
import config from '../../config/config.js';
import Event from '../Event.js';
import startVerification from '../../verification/managers/startVerification.js';
import { verbose } from '../../config/out.js';

/**
 * Handler for guildMemberUpdate event. Event when a user's updated.
 */
class GuildMemberUpdate extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.GuildMemberUpdate) {
        super(client, name);
    }

    /**
     * @param {GuildMember} oldMember The member before the update
     * @param {GuildMember} newMember The member after the update
     */
    async run(oldMember, newMember) {
        if (newMember.user.bot) {
            return;
        }

        // Make sure they are not already verified
        if (newMember.roles.cache.has(config.roles.verified)) { return; }

        // Make sure they didn't have the member role before
        if (oldMember.roles.cache.has(config.roles.member)) { return; }

        // Make sure they have the member role now
        if (!newMember.roles.cache.has(config.roles.member)) { return; }

        const catagories = {
            isTrans: '1105354251909206078',
            isQuestioning: '1105354300756086794',
            isCis: '1105354278111019048',
        };

        const category = Object.keys(catagories).find((key) => {
            const output = newMember.roles.cache.has(catagories[key]);
            return output;
        });

        if (!category) { return; }

        const verificationChannel = newMember.guild.channels.cache.find(
            (channel) => channel.id === config.channels.lobby,
        );

        await startVerification(
            verificationChannel.threads,
            newMember,
            (ticket, message) => {
                verbose(`Created ticket with id ${ticket.id} for ${newMember.user.tag} ${newMember.id}`);
            },
            (message) => console.log(message || ('Failed to start verification: on member join.')),
            category,
        );
    }
}

export default GuildMemberUpdate;
