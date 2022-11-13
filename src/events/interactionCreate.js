import { Events } from 'discord.js';
import { debug, verbose } from '../config/out.js';
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

            verbose(`${interaction.user.tag} ran slash command: ${commandName}`);
            debug(`Slash command '${commandName}' options:`);
            debug(interaction.options.data);

            await command.run(interaction);
        } else if (interaction.isContextMenuCommand()) { // context menu commands
            const { commandName } = interaction;
            const command = interaction.client.getContextMenuCommand(commandName);

            verbose(`${interaction.user.tag} ran context menu command: ${commandName}`);
            debug(`Context menu '${commandName}' member:`);
            debug(interaction.member);
            debug(`Context menu '${commandName}' target:`);
            debug(interaction.targetMember ?? interaction.targetMessage);

            await command.run(interaction);
        } else if (interaction.isButton()) { // buttons
            const [customId, ...args] = TakesArguments.tokenize(interaction.customId);
            const button = interaction.client.getButton(customId);

            verbose(`${interaction.user.tag} ran button: ${customId}`);
            debug(`Button '${customId}' args:`);
            debug(args);

            await button.run(interaction, ...args);
        } else if (interaction.isSelectMenu()) { // select menus
            const [customId, ...args] = TakesArguments.tokenize(interaction.customId);
            const selectMenu = interaction.client.getSelectMenu(customId);

            verbose(`${interaction.user.tag} ran select menu: ${customId}`);
            debug(`Select menu '${customId}' values:`);
            debug(interaction.values);
            debug(`Select menu '${customId}' args:`);
            debug(args);

            await selectMenu.run(interaction, ...args);
        } else if (interaction.isModalSubmit()) { // modals
            const [customId, ...args] = TakesArguments.tokenize(interaction.customId);
            const modal = interaction.client.getModal(customId);

            verbose(`${interaction.user.tag} ran modal submit: ${customId}`);
            debug(`Modal '${customId}' values:`);
            debug(interaction.fields.fields);
            debug(`Modal '${customId}' args:`);
            debug(args);

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
