import Event from '../classes/Event.js';

/**
 * Handler for the ready event. Simply displays a log in message. A ready
 * event is emitted after the bot is finished loading and logging in
 */
class Ready extends Event {
    /**
     * Constructor for Ready class
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = 'ready') {
        super(client, name);
    }

    async run() {
        console.log(`Logged in as ${this.client.user.tag}`);
    }
}

export default Ready;
