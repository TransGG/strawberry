import Command from '../classes/Command.js'

/**
 * Handler for ping command. Replies to the given message with 'pong!'
 * Can be used to test if the bot is working.
 */
class Ping extends Command {
    async run(message) {
        message.reply('pong!')
    }
}

export default Ping