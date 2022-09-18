import Event from '../classes/Event.js'

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
        // check for prefix
        if (!message.content.startsWith(this.client.prefix)) {
            return
        }

        // get the command that has a name consisting of the message without the prefix
        let command = this.client.getCommand(
            message.content.replace(this.client.prefix, '')
        )

        // check if the command exists then run it
        if (command) {
            command.run(message)
        }
    }
}

export default MessageCreate