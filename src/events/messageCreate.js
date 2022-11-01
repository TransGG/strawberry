import { Events } from 'discord.js';
import { debug } from '../config/out.js';
import Event from '../Event.js';

/**
 * Handler for messageCreate event
 */
class MessageCreate extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.MessageCreate) {
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
