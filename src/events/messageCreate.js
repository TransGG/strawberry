import Event from '../Event.js';

/**
 * Handler for messageCreate event. Runs a command if the message starts with the correct prefix and the remaining
 * message is a valid name of a command.
 */
class MessageCreate extends Event {
    /**
     * Constructor for MessageCreate class
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = 'messageCreate') {
        super(client, name);
    }

    /**
     * @param {Message} message The message whose creation triggered this event
     */
    async run(message) {
        // do nothing...
    }
}

export default MessageCreate;
