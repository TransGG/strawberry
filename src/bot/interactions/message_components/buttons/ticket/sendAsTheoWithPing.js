import SendAsTheo from './sendAsTheo.js';

/**
 * Handler for sendAsTheoWithPing button. Displays a modal that will send a message
 */
class SendAsTheoWithPing extends SendAsTheo {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'sendAsTheoWithPing') {
        super(name, true);
    }
}

export default SendAsTheoWithPing;
