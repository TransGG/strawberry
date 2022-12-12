import { buildGreetEmbeds, buildGreetMessageContent } from '../../content/greet.js';

/**
 * Sends a welcome message for a user
 * @param {BaseGuildTextChannel} channel A text channel
 * @param {GuildMember} applicant A member of the server
 * @returns {Promise<Message>} The message that was sent
 */
function sendGreetMessage(channel, applicant) {
    return channel.send({
        content: buildGreetMessageContent(applicant),
        embeds: buildGreetEmbeds(applicant),
    });
}

export default sendGreetMessage;
