import SendMessage from './sendMessage.js';

/**
 * Handler for sendMessageWithPing modal. Accepts input to create a message to send
 */
class SendMessageWithPing extends SendMessage {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'sendMessageWithPing') {
        super(name, true);
    }
}

export default SendMessageWithPing;
