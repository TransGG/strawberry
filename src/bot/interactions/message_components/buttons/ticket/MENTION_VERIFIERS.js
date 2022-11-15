import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    roleMention,
} from 'discord.js';
import config from '../../../../../config/config.js';
import TakesArguments from '../../../TakesArguments.js';
import Button from '../../Button.js';

/**
 * Handler for MENTION_VERIFIERS button. Summons verifiers to the verification ticket.
 */
class MentionVerifiers extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'MENTION_VERIFIERS') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData(type) {
        const stringify = String(type);
        if (stringify === '1') {
            return new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel('I Need Help Please.')
                .setStyle(ButtonStyle.Secondary);
        }
        if (stringify === '2') {
            return new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel('Finished Answering!')
                .setStyle(ButtonStyle.Success);
        }
        throw new Error(`Invalid argument for button ${this.name}: ${type}`);
    }

    /**
     * Creates a version of the data with arguments added in.
     * @param {string|number} type Arguments to add on to the data
     * @returns {ButtonBuilder} The data with the arguments added in
     */
    addArgs(type) {
        return TakesArguments.addArgs(this.getData(type), type);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     * @param {string} type The type of mention verifiers button. 1 or 2.
     */
    async run(interaction, type) {
        // check if user may click this button
        if (interaction.user.id !== interaction.channel.name.split(' | ')[1]) {
            await interaction.reply({
                content: 'You are not allowed to use this command, this can only be used by the thread owner.',
                ephemeral: true,
            });
            return;
        }

        const messages = await interaction.channel.messages.fetch();

        if (!messages) {
            return;
        }

        if (messages.size === 1) {
            await interaction.reply({
                content: 'You have not sent any messages in this channel yet, please answer the questions in the message above before clicking "Finished Answering!" or ask a question before clicking "I Need Help Please."\nThank you ❤️',
                ephemeral: true,
            });
            return;
        }

        // user can click, proceed disable buttons
        interaction.update({
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        interaction.client.getButton('VERIFIER_ACTIONS'),
                        interaction.client.getButton('MENTION_VERIFIERS')
                            .addArgs(1)
                            .setDisabled(true),
                        interaction.client.getButton('MENTION_VERIFIERS')
                            .addArgs(2)
                            .setDisabled(true),
                    ),
            ],
        });

        // create log calculate time TODO: consolidate this with the other date calculation
        const oneDay = 1000 * 60 * 60 * 24;
        const oneHour = 1000 * 60 * 60;
        const now = Date.now();
        const diffInTime = now - interaction.user.createdAt;
        const diffInTimeJoined = now - interaction.member.joinedTimestamp;

        let helpMessage = 'Please verify the user';
        if (type === '1') {
            helpMessage = 'Please help the user';
        }

        // create log embed
        const logEmbed = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.avatarURL(),
            })
            .setDescription(`${roleMention(config.roles.verifier)} ${helpMessage} ${interaction.user.tag}`)
            .setTimestamp()
            .setFooter({
                text: `${interaction.client.user.tag}`,
                iconURL: interaction.client.user.avatarURL(),
            })
            .addFields([{
                name: 'Joined At',
                value: `<t:${Math.round(interaction.member.joinedTimestamp / 1000)}:F> (${Math.floor(diffInTimeJoined / oneDay)} days, ${Math.floor(diffInTimeJoined / oneHour)} hours ago)`,
            },
            {
                name: 'Created At',
                value: `<t:${Math.round(new Date(interaction.user.createdAt).getTime() / 1000)}:F> (${Math.floor(diffInTime / oneDay)} days, ${Math.floor(diffInTime / oneHour)} hours old)`,
            },
            ]);

        // send log
        interaction.channel.send({
            content: roleMention(config.roles.verifier),
            embeds: [logEmbed],
            allowedMentions: {
                roles: [config.roles.verifier],
            },
        });
    }
}

export default MentionVerifiers;
