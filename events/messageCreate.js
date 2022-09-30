import Event from '../classes/Event';

/**
 * Handler for messageCreate event. Runs a command if the message
 * starts with the correct prefix and the remaining message is a
 * valid name of a command.
 */
class MessageCreate extends Event {
    /**
     * @param {Message} message The message whose creation triggered this event
     */
    async run(message) {
        // do nothing...
    }
}

export default MessageCreate;
