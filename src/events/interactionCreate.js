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
     * Looks up the interaction from the interaction's client and runs it.
     * @param {Interaction} interaction The interaction whose creation triggered this event
     */
    async run(interaction) {
        if (interaction.isChatInputCommand()) { // slash commands
            const { commandName } = interaction;
            const command = interaction.client.getSlashCommand(commandName);
            await command.run(interaction);
        } else if (interaction.isUserContextMenuCommand()) { // context menu commands
            const { commandName } = interaction;
            const command = interaction.client.getContextMenuCommand(commandName);
            await command.run(interaction);
        } else if (interaction.isButton()) { // buttons
            const { customId } = interaction;
            const button = interaction.client.getButton(customId);
            await button.run(interaction);
        } else if (interaction.isSelectMenu()) { // select menus
            const { customId } = interaction;
            const selectMenu = interaction.client.getSelectMenu(customId);
            await selectMenu.run(interaction);
        } else if (interaction.isModalSubmit()) { // modals
            const { customId } = interaction;
            const modal = interaction.client.getModal(customId);
            await modal.run(interaction);
        } else if (interaction.isAutocomplete()) { // autocomplete
            const { commandName } = interaction;
            const command = interaction.client.getSlashCommand(commandName);
            command.autocomplete(interaction);
        }
    }
}

export default InteractionCreate;
