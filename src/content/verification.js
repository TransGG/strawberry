import { ActionRowBuilder, EmbedBuilder, roleMention } from 'discord.js';
import config from '../config/config.js';
import buildTimeInfoString from '../formatters/stringBuilders.js';
import { buildQuestions } from './questions.js';

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
                name: applicant.user.tag,
                iconURL: applicant.user.avatarURL(),
            })
            .setDescription(`${roleMention(config.roles.verifier)} ${helpMessage} ${applicant.user.tag}`)
            .addFields(
                {
                    name: 'Joined At',
                    value: buildTimeInfoString(applicant.joinedAt),
                },
                {
                    name: 'Created At',
                    value: buildTimeInfoString(applicant.user.createdAt),
                },
            )
            .setTimestamp()
            .setFooter({
                text: client.user.tag,
                iconURL: client.user.avatarURL(),
            }),
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
 * Creates the select menu component for a verification ticket prompt
 * @param {Bot} client A client from which components can be retrieved
 * @returns {ActionRowBuilder} An array of action rows containing the components
 */
function buildPromptSelectComponents(client) {
    return new ActionRowBuilder()
        .addComponents(
            client.getSelectMenu('preStartVerification'),
        );
}

/**
 * Builds embeds for a prompt
 * @param {GuildMember} applicant The applicant
 * @returns {EmbedBuilder[]} The embeds for a prompt
 */
function buildPromptEmbeds(applicant, type) {
    // TODO: read the questions from a file
    const now = Date.now();
    return [
        new EmbedBuilder()
            .setTitle(`Verification Ticket for ${applicant.user.tag}`)
            .setColor(0xB8CCE6)
            .setDescription(`Hi! As a part of the verification process, we ask that you quickly answer the following questions.\nPlease note that there are no right or wrong to answers these questions, but please try and give thorough / detailed responses to be verified quickly.\n\`\`\`markdown\n${buildQuestions(type).join('\n\n')}\n\`\`\``)
            .setFooter({ text: 'After you have answered all of the questions, please click the "Finished Answering!" button below which will add our verifier staff to your thread.\nIf you have any problems while answering, please click the "I Need Help Please" button instead.' })
            .setImage('https://i.imgur.com/CBbbw0d.png'),
        new EmbedBuilder()
            .setAuthor({
                name: applicant.user.tag,
            })
            .setTitle('User Information')
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
    buildPromptEmbeds,
    buildPromptComponents,
    buildVerifierActionComponents,
    buildPromptSelectComponents,
};
