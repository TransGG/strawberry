// event handler for messageCreate event
// messageCreate happens whenever a message is sent in the guild

const Discord = require('discord.js')

module.exports = {
    name: 'messageCreate', //must match file name
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot

        // ignore the following message types:
        // if message was not sent as part of a guild
        if (!message.guild) return

        // if message was sent by bot
        if (message.author.bot) return

        // if message doesn't start with the prefix
        if (!message.content.startsWith(prefix)) return


        // get command and args
        const args = message.content.slice(prefix.length).trim().split(/ +/g) // remove the prefix, cut out spaces, then split along spaces
        const cmdstr = args.shift().toLowerCase() // shift pops the first element of args

        let command = client.commands.get(cmdstr) // using cmdstr, get the command from the client.commands collection
        if (!command) return // if command is empty, it wasn't a valid command so ignore

        // permissions checking
        let member = message.member

        if (command.devOnly && !owners.includeds(member.id)) {
            return message.reply('This command is only available to the bot owners')
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
            return message.reply('You do not have permission to use this command')
        }

        // call the command
        try {
            await command.run({...bot, message, args})
        } catch (error) {
            let errMsg = error.toString()

            if(errMsg.startsWith('?')) { // convention of the person who wrote the tutorial is that errors with '?' are errors that are triggered manually
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            } else {
                console.error(error)
            }
        }
    }
}