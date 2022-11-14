import {
    ActionRowBuilder,
    bold,
    ButtonBuilder,
    ButtonStyle,
    channelLink,
    codeBlock,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    userMention,
} from 'discord.js';
import config from '../../../config/config.js';
import Modal from '../Modal.js';

/**
 * Handler for KICK_USER modal. Modal to kick a user and provide reasons
 */
class KickUser extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'KICK_USER') {
        super(name);
    }

    /**
     * @returns {ModalBuilder} The data that describes the modal format to the Discord API
     */
    getData() {
        return new ModalBuilder()
            .setCustomId(this.name)
            .setTitle('Deny a users verification.')
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('userReason')
                            .setRequired(true)
                            .setMinLength(5)
                            .setMaxLength(1024)
                            .setLabel('Reason (Sent To User) (REQUIRES DMs ENABLED)')
                            .setStyle(TextInputStyle.Paragraph)
                            .setPlaceholder('You were kicked/your application has been rejected because...'),
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('logReason')
                            .setRequired(false)
                            .setMinLength(5)
                            .setMaxLength(1024)
                            .setLabel('Logs Reason (Not Shared With User)')
                            .setStyle(TextInputStyle.Paragraph)
                            .setPlaceholder('Optional.'),
                    ),
            );
    }

    /**
     * Method to run when this modal is submitted
     * @param {ModalSubmitInteraction} interaction The interaction that was emitted when this modal
     *     was submitted
     */
    async run(interaction) {
        // find member TODO: fix this parsing here and elsewhere
        const threadName = interaction.channel.name.split(' | ');
        if (threadName.length !== 2) {
            return;
        }

        const guildMember = await interaction.guild.members.fetch(threadName[1]);
        if (!guildMember) {
            await interaction.reply({
                content: 'Member is no longer apart of guild.',
                ephemeral: true,
            });
            return;
        }

        // get escaped version of input to send TODO: use new markdown escaping
        function escapeMarkdown(text) {
            const unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1'); // unescape any "backslashed" character
            const escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1'); // escape *, _, `, ~, \
            return escaped;
        }

        const userReason = escapeMarkdown(interaction.fields.getTextInputValue('userReason'));
        const logReason = escapeMarkdown(interaction.fields.getTextInputValue('logReason'));

        let unable = false;

        // DM the user with the reason
        await guildMember.send({
            content: `Your verification ticket within ${bold(interaction.guild.name)} has been denied for the following reason:\n${codeBlock(userReason)}`,
        }).catch(() => { unable = true; });

        // kick member
        await guildMember.kick('Member was kicked during verification');

        // create kick log
        const logEmbed = new EmbedBuilder()
            .setAuthor({
                name: `${guildMember.user.tag}`,
                iconURL: guildMember.user.avatarURL(),
            })
            .setTitle(`The user ${guildMember.user.tag} has been kicked from the server.`)
            .setDescription(`Reason ${unable ? '(Unable to Send to User)' : '(Sent to User)'}: ${codeBlock(userReason)}\nLogs Reason (Not Shared):${codeBlock(logReason)}`)
            .setTimestamp()
            .setFooter({
                text: interaction.client.user.tag,
                iconURL: interaction.client.user.avatarURL(),
            })
            .addFields([{
                name: 'User Information',
                value: `${guildMember.user.tag} (${guildMember.user.id}) ${userMention(guildMember.user.id)}`,
            },
            {
                name: 'Verifier Information',
                value: `${interaction.user.tag} (${interaction.user.id}) ${userMention(interaction.user.id)}`,
            },
            {
                name: 'ID\'s',
                value: codeBlock('ini', `Verifier = ${interaction.user.id}\nUser = ${guildMember.user.id}\nThread = ${interaction.channel.id}`),
            },
            ]);

        await interaction.client.channels.cache.get(config.channels.verifyLogsSecondary).send({
            embeds: [logEmbed],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setURL(channelLink(interaction.channel.id, config.guild))
                            .setLabel('View Thread')
                            .setStyle(ButtonStyle.Link),
                    ),
            ],
        });

        await interaction.reply({
            content: `Kicked ${guildMember.user.tag} from the server.`,
            ephemeral: true,
        });
    }
}

export default KickUser;
