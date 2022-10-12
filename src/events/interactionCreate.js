import Event from '../Event.js';

/**
 * Handler for interactionCreate event
 */
class interactionCreate extends Event {
    /**
     * Constructor for InteractionCreate class
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = 'interactionCreate') {
        super(client, name);
    }

    /**
     * @param {Interaction} interaction The interaction whose creation triggered this event
     */
    async run(interaction) {
        // slash commands
        if (interaction.isChatInputCommand()) {
            const { commandName } = interaction;
            const command = this.client.getSlashCommand(commandName);
            command.run(interaction);
        }

        // buttons
        if (interaction.commandName === 'button') {
            // todo: handle buttons
        }
    }
}

export default interactionCreate;
