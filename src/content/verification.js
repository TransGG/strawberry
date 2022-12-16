import { ActionRowBuilder, EmbedBuilder, roleMention } from 'discord.js';
import config from '../config/config.js';
import buildTimeInfoString from '../formatters/stringBuilders.js';

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
                text: `${client.user.tag}`,
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
 * Builds embeds for a prompt
 * @param {GuildMember} applicant The applicant
 * @returns {EmbedBuilder[]} The embeds for a prompt
 */
function buildPromptEmbeds(applicant) {
    // TODO: read the questions from a file
    return [
        new EmbedBuilder()
            .setTitle(`Verification Ticket for ${applicant.user.tag}`)
            .setDescription(`Hi! Thank you for your patience with the verification process. As a part of the verification process, we ask that you answer the following questions. Do note that there are no right or wrong to answers these questions, but please try and give thorough / detailed responses. 
    
***Please keep in mind that 1-5 word / simple answers will oftentimes require more questions to have you verified, please try and give thoughtful / detailed responses to be verified quicker, no need to stress however if you cannot think of anything else to put, on behalf of our verification team thank you.*** :heart:

\`\`\`markdown
1. Do you agree to the server rules and to respect the Discord Community Guidelines & Discord ToS?

2. Do you identify as transgender; and/or any other part of the LGBTQ+ community? (Please be specific in your answer)

3. Do you have any friends who are already a part of our Discord? (If yes, please send their username)

4. What’s your main goal / motivation in joining the TransPlace Discord?

5. If you could change one thing about the dynamic of the LGBTQ+ community, what would it be? 

6. What is gatekeeping in relation to the trans community?

# If you have any social media that contains relevant post history related to the LGBTQ+ community, please link it to your discord account or send the account name or URL. 

*(We may use this to help fast track your verification, but linking/sharing any accounts is not required)\`\`\`
***If you need any help please click the "I Need Help Please." button and our verifiers will be added to your thread to help you.\nAfter you have answered all of the questions, please click the "Finished Answering!" button below which will add our verifier staff to your thread.***`)
            .setFooter({ text: 'After answering these questions, a member of the Verification Team may reach out if the answers to the above questions are incomplete or too vague. Thank you again for your patience and we can’t wait for you to join the TransPlace Discord.' }),
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
};
