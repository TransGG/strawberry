import Event from '../Event.js';

/**
 * Handler for interactionCreate event
 */
class InteractionCreate extends Event {
    /**
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
            const command = interaction.client.getSlashCommand(commandName);
            await command.run(interaction);
        }

        // buttons
        if (interaction.isButton()) {
            const { customId } = interaction;
            const button = interaction.client.getButton(customId);
            await button.run(interaction);
        }
    }
}

export default InteractionCreate;
