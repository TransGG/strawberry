import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events,
} from 'discord.js';
import config from '../../config/config.js';
import Event from '../Event.js';

/**
 * Handler for guildMemberAdd event. Event when a user joins the server.
 */
class GuildMemberAdd extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.GuildMemberAdd) {
        super(client, name);
    }

    /**
     * @param {GuildMember} member The member that joined
     */
    async run(member) {
        if (member.user.bot) {
            return;
        }

        await member.send({
            content: `**Hey 👋 Welcome to ${member.guild.name}, ${member.user.username}!**

In order to join our community we require that you have a discord avatar set and have claimed your discord account. Claiming your account means you must have your your e-mail verified on discord and have set a user name and password.

To see the rest of the channels within our server, please click the button below, or head back to our server to read our rules and continue our verification process, don't worry, its easy ❤.

Have fun in ${member.guild.name}! We're excited to have you join our wonderful community!

Permanent invite link: https://discord.gg/${config.guilds[member.guild.id].invite}`,

            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setURL(config.guilds[member.guild.id].invite)
                            .setLabel(`Join ${member.guild.name}!`)
                            .setStyle(ButtonStyle.Link),
                    ),
            ],

        }).catch(() => {
            console.log(`Failed to DM the user with the ID: ${member.user.id}, perhaps they have DMs disabled?`);
        });

        member.roles.add(
            config.guilds[member.guild.id].roles.member,
            'Auto adding member role.',
        );

        // Check if they are verified in any of the linked communities

        config.guilds[member.guild.id].sync.forEach(async (guildId) => {
            const guild = this.client.guilds.cache.get(guildId);

            if (!guild) {
                return;
            }

            try {
                const memberInGuild = await guild.members.fetch(member.id);
                // check if that have that guilds verified role
                const hasVerifiedRole = memberInGuild.roles.cache.has(
                    config.guilds[guildId].roles.verified,
                );

                if (hasVerifiedRole) {
                    member.roles.add(
                        config.guilds[member.guild.id].roles.verified,
                        `Verified in ${memberInGuild.guild.name} | Auto adding member role from synced community.`,
                    );

                    // Send a log in both servers verify-log channel
                    const logChannel = member.guild.channels.cache.get(
                        config.guilds[member.guild.id].channels.verifyLogs,
                    );
                    const logChannel2 = guild.channels.cache.get(
                        config.guilds[guildId].channels.verifyLogs,
                    );

                    if (logChannel) {
                        logChannel.send({
                            content: `<@${member.user.id}> (${member.user.id}) is already verified in \`${guild.name}\` (${guild.id}). They have been auto verified.`,
                        });
                    }

                    if (logChannel2) {
                        logChannel2.send({
                            content: `<@${member.user.id}> (${member.user.id}) has joined \`${member.guild.name}\` (${member.guild.id}) and has been auto verified due to being verified in this community.`,
                        });
                    }
                }
            } catch {
                console.log(`Failed to fetch member in ${guild.name}, user likely isn't in guild.`);
            }
        });
    }
}

export default GuildMemberAdd;
