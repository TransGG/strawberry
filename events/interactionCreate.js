import Event from '../classes/Event.js'

/**
 * Handler for interactionCreate event
 */
class interactionCreate extends Event {

    /**
     * @param {Interaction} interaction The interaction whose creation triggered this event
     */
    async run(interaction) {
        // slash commands
        if(interaction.isChatInputCommand()) {
            const commandName = interaction.commandName
            let command = this.client.getSlashCommand(commandName)
            command.run(interaction)
        }

        // buttons
        if (interaction.commandName === 'button') {
            // todo: handle buttons
        }
    }
}


export default interactionCreate