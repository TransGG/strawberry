import {
    ActionRowBuilder,
    codeBlock,
    EmbedBuilder,
    StringSelectMenuBuilder,
} from 'discord.js';

import buildTimeInfoString from '../formatters/stringBuilders.js';
import { buildOptions, formatQuestions } from './questions.js';
import config from '../config/config.js';

/**
 * Builds the embeds used in mentioning verifiers
 * @param {GuildMember} applicant The verification applicant
 * @param {Client} client The client sending the verifier mention
 * @param {string} helpMessage The message to display
 * @returns {EmbedBuilder[]} The embeds used in mentioning verifiers
 */
function buildMentionVerifiersEmbeds(applicant, client, helpMessage) {
    return [
        new EmbedBuilder()
            .setAuthor({
                name: `${applicant.user.tag}`,
                iconURL: applicant.user.avatarURL(),
            })
            .setDescription(`${helpMessage} ${applicant.user.tag}`)
            .setTimestamp()
            .setFooter({
                text: `${client.user.tag}`,
                iconURL: client.user.avatarURL(),
            }),
    ];
}

/**
 * Creates the components for selecting a verification prompt
 * @param {string} guildId ID of the guild
 * @returns {ActionRowBuilder[]} An array of action rows containing the components
 */
function buildPromptSelectComponents(guildId) {
    return [
        new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('preStartVerification')
                    .setPlaceholder('What do you identify as?')
                    .addOptions(buildOptions(guildId)),
            ),
    ];
}

/**
 * Creates the components for a verification ticket prompt
 * @param {Bot} client A client from which components can be retrieved
 * @param {boolean} [mentionVerifiersDisabled=false] Whether to disable the mention verifiers
 *     buttons
 * @returns {ActionRowBuilder[]} An array of action rows containing the components
 */
function buildPromptComponents(client, mentionVerifiersDisabled = false) {
    return [
        new ActionRowBuilder()
            .addComponents(
                client.getButton('verifierActions'),
                client.getButton('mentionVerifiers').addArgs(1).setDisabled(mentionVerifiersDisabled),
                client.getButton('mentionVerifiers').addArgs(2).setDisabled(mentionVerifiersDisabled),
            ),
    ];
}

/**
 * Builds embeds for a prompt
 * @param {GuildMember} applicant The applicant
 * @param {string} type The type of questions
 * @returns {EmbedBuilder[]} The embeds for a prompt
 */
function buildPromptEmbeds(applicant, type) {
    const questionsSection = codeBlock('markdown', formatQuestions(applicant.guild.id, type).join('\n\n'));

    const now = Date.now();
    return [
        new EmbedBuilder()
            .setTitle(`Verification Ticket for ${applicant.user.tag}`)
            .setColor(0xB8CCE6)
            .setDescription(`Please answer the following verification questions. There are no right or wrong answers, but thorough answers will help us verify you quickly.\n${questionsSection}\n[Click here to view our server rules.](${config.guilds[applicant.guild.id].links.rules})`)
            .setImage('https://i.imgur.com/CBbbw0d.png'),
        new EmbedBuilder()
            .setTitle(applicant.user.tag)
            .setColor(0xE6B8D8)
            .setThumbnail(applicant.user.displayAvatarURL())
            .addFields(
                {
                    name: 'Joined At',
                    value: buildTimeInfoString(applicant.joinedAt, now),
                },
                {
                    name: 'Created At',
                    value: buildTimeInfoString(applicant.user.createdAt, now),
                },
            )
            .setImage('https://i.imgur.com/CBbbw0d.png'),
    ];
}

/**
 * Builds the components for verifier actions
 * @param {Bot} client A client that contains components
 * @returns {ActionRowBuilder[]} The components for verifier actions
 */
function buildVerifierActionComponents(client) {
    return [
        new ActionRowBuilder()
            .addComponents(
                client.getButton('verifyUser'),
                client.getButton('verifyUserWithoutImages'),
            ),
        new ActionRowBuilder()
            .addComponents(
                client.getButton('sendAsTheo'),
                client.getButton('sendAsTheoWithPing'),
            ),
        new ActionRowBuilder()
            .addComponents(
                client.getButton('denyKickButton'),
                client.getButton('denyBanButton'),
            ),
    ];
}

export {
    buildMentionVerifiersEmbeds,
    buildPromptSelectComponents,
    buildPromptEmbeds,
    buildPromptComponents,
    buildVerifierActionComponents,
};
