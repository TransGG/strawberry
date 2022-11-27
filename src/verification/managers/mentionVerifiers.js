import {
    buildPromptComponents,
    isApplicantAnswered,
    isBelongsToMember,
    sendMentionVerifiers,
} from '../controllers/ticket.js';

/**
 * Mentions the verifiers in a ticket.
 * @param {function} resolve Success callback. Takes one parameter - components: ActionRowBuilder[]
 * @param {function} reject Failure callback: Takes one parameter - message
 * @param {TextBasedChannel} ticket The verification ticket to mention verifiers in
 * @param {GuildMember} applicant The applicant to the ticket
 * @param {Bot} client The client that is sending the log as well as that contains buttons
 * @param {string} type Type of message to send (will display 'Please help the user' if value is '1'
 *     and 'Please verify the user' if value is '2'
 */
async function mentionVerifiers(resolve, reject, ticket, applicant, client, type) {
    if (!isBelongsToMember(ticket, applicant)) {
        await reject('You are not allowed to use this command, this can only be used by the thread owner.');
        return;
    }

    if (!await isApplicantAnswered(ticket)) {
        await reject('You have not sent any messages in this channel yet, please answer the questions in the message above before clicking "Finished Answering!" or ask a question before clicking "I Need Help Please."\nThank you ❤️');
        return;
    }

    // a little sneaky difference to determine if type was an unexpected value
    let helpMessage = 'Please verify the user:';
    if (`${type}` === '1') {
        helpMessage = 'Please help the user';
    } else if (`${type}` === '2') {
        helpMessage = 'Please verify the user';
    }

    await sendMentionVerifiers(ticket, applicant, client, helpMessage);

    await resolve([buildPromptComponents(client, true)]);
}

export default mentionVerifiers;
