import Event from '../classes/Event.js';

/**
 * Handler for the ready event. Simply displays a log in message. A ready
 * event is emitted after the bot is finished loading and logging in
 */
class Ready extends Event {
    async run() {
        console.log(`Logged in as ${this.client.user.tag}`);
    }
}

export default Ready;