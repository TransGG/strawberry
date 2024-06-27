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

        /*
         * This magic number is used in the link button. It looks like a channel id. Comes from
         * original theo code.
         */
        const magicNumber = '987358841245151262';

        await member.send({
            content: `**Hey 👋 Welcome to TransPlace, ${member.user.username}!**

In order to join our community we require that you have a discord avatar set and have claimed your discord account. Claiming your account means you must have your your e-mail verified on discord and have set a user name and password.

To see the rest of the channels within our server, please click the button below, or head back to our server to read our rules and continue our verification process, don't worry, its easy ❤.

Have fun in TransPlace! We're excited to have you join our wonderful community!

Permanent invite link: https://discord.gg/TransPlace`,

            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setURL('https://discord.gg/TransPlace')
                            .setLabel('Join TransPlace!')
                            .setStyle(ButtonStyle.Link),
                    ),
            ],

        }).catch(() => {
            console.log(`Failed to DM the user with the ID: ${member.user.id}, perhaps they have DMs disabled?`);
        });

        member.roles.add("1105230385769623584");
    }
}

export default GuildMemberAdd;
