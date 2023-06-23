import { ActionRowBuilder, codeBlock, EmbedBuilder } from 'discord.js';

import buildTimeInfoString from '../formatters/stringBuilders.js';
import { formatQuestions } from './questions.js';

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
 * @param {Bot} client A client from which components can be retrieved
 * @returns {ActionRowBuilder[]} An array of action rows containing the components
 */
function buildPromptSelectComponents(client) {
    return [
        new ActionRowBuilder()
            .addComponents(
                client.getSelectMenu('preStartVerification'),
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
    const questionsSection = codeBlock('markdown', formatQuestions(type).join('\n\n'));

    const now = Date.now();
    return [
        new EmbedBuilder()
            .setTitle(`Verification Ticket for ${applicant.user.tag}`)
            .setColor(0xB8CCE6)
            .setDescription(`Please answer the following verification questions. There are no right or wrong answers, but thorough answers will help us verify you quickly.\n${questionsSection}\n[Click here to view our server rules.](https://canary.discord.com/channels/959551566388547676/1057132419150532678/1057157755623968810)`)
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
