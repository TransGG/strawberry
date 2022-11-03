import { Events } from 'discord.js';
import Event from '../Event.js';

/**
 * Handler for error event
 */
class Error extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.Error) {
        super(client, name);
    }

    /**
     * @param {Error} error The error that was encountered
     */
    async run(error) {
        console.log('In error handler:');
        console.error(error);
    }
}

export default Error;
