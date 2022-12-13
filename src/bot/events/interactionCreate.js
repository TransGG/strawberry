import { Events } from 'discord.js';
import { verbose } from '../../config/out.js';
import Event from '../Event.js';
import TakesArguments from '../interactions/TakesArguments.js';

/**
 * Handler for interactionCreate event
 */
class InteractionCreate extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.InteractionCreate) {
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

            verbose(`${interaction.user.tag} ran slash command ${commandName}, options:`, interaction.options.data);

            await command.run(interaction);
        } else if (interaction.isContextMenuCommand()) { // context menu commands
            const { commandName } = interaction;
            const command = interaction.client.getContextMenuCommand(commandName);

            verbose(`${interaction.user.tag} ran context menu command ${commandName}, target:`, interaction.targetUser ?? interaction.targetMessage);

            await command.run(interaction);
        } else if (interaction.isButton()) { // buttons
            const [customId, ...args] = TakesArguments.tokenize(interaction.customId);
            const button = interaction.client.getButton(customId);

            verbose(`${interaction.user.tag} ran button ${customId}, args:`, args);

            await button.run(interaction, ...args);
        } else if (interaction.isSelectMenu()) { // select menus
            const [customId, ...args] = TakesArguments.tokenize(interaction.customId);
            const selectMenu = interaction.client.getSelectMenu(customId);

            verbose(`${interaction.user.tag} ran select menu ${customId}, args:`, args, ', values:', interaction.values);

            await selectMenu.run(interaction, ...args);
        } else if (interaction.isModalSubmit()) { // modals
            const [customId, ...args] = TakesArguments.tokenize(interaction.customId);
            const modal = interaction.client.getModal(customId);

            verbose(`${interaction.user.tag} ran modal submit ${customId}, args:`, args, ', values:', interaction.fields.fields);

            await modal.run(interaction, ...args);
        } else if (interaction.isAutocomplete()) { // autocomplete
            const { commandName } = interaction;
            const command = interaction.client.getSlashCommand(commandName);

            verbose(`${interaction.user.tag} ran autocomplete for command ${commandName}: ${interaction.options.getFocused()}`);

            command.autocomplete(interaction);
        }
    }
}

export default InteractionCreate;
