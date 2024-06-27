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
    }
}

export default GuildMemberAdd;
