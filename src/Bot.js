import { Client, Collection } from 'discord.js';
import { LookupError } from './utils/errors.js';
import {
    loadSlashCommands,
    loadEvents,
    loadSubcommands,
    loadButtons,
    loadSelectMenus,
    loadModals,
    loadContextMenuCommands,
} from './utils/loadFiles.js';
import { registerApplicationCommands, deleteAllApplicationCommands } from './utils/registerApplicationCommands.js';

class Bot extends Client {
    // these collections are populated as a map with the name of the event/slash command/etc. as the key and an instance
    // of its respective class as the value
    #events = new Collection();

    #slashCommands = new Collection();

    #buttons = new Collection();

    #selectMenus = new Collection();

    #modals = new Collection();

    #contextMenuCommands = new Collection();

    /**
     * Run this function to get the bot going. Loads the necessary files to populate the members of the Botm connects to
     *  Discord using the Discord API, then optionally registers application commands
     * @param {string} token The OAuth2 token to use to log in to the bot (see https://discord.com/developers/docs/topics/oauth2#bots)
     * @param {Object} [options={}] The options to be used while starting the bot
     * @param {boolean} [options.registerCommands=false] Will register application commands if true, do nothing
     *     otherwise
     * @param {boolean} [options.clean=false] Will clear all application commands from the target if true. This happens
     *     before registration of commands.
     * @param {Snowflake} [options.guildId=null] Specifies a guild to load application commands into; commands will be
     *     registered globally if unspecified
     */
    async start(token, { registerCommands = false, clean = false, guildId = null } = {}) {
        // init
        loadButtons(this.#buttons);
        loadSelectMenus(this.#selectMenus);
        loadModals(this.#modals);
        await loadEvents(this.#events, this);
        await loadSlashCommands(this.#slashCommands);
        await loadSubcommands(this.#slashCommands);
        await loadContextMenuCommands(this.#contextMenuCommands);

        await super.login(token);

        // do requested command registration tasks (needs to wait on commands to be loaded and client logged in)
        if (clean) {
            await deleteAllApplicationCommands(guildId);
        }
        if (registerCommands) {
            await registerApplicationCommands(this.#slashCommands, guildId);
            await registerApplicationCommands(this.#contextMenuCommands, guildId);
        }
    }

    /**
     * Retrieves the slash command that matches the given name.
     * @param {string} slashCommandName The name matching the SlashCommand.name field
     * @returns {SlashCommand} The slash command that has a name matching SlashCommandName
     */
    getSlashCommand(slashCommandName) {
        const command = this.#slashCommands.get(slashCommandName);

        if (!command) {
            throw new LookupError(
                `Tried to lookup '/${slashCommandName}' but it was not found! (psst: try deleting commands that are registered but no longer exist or updating commands)`,
                slashCommandName,
                this.#slashCommands,
            );
        }

        return command;
    }

    /**
     * Retrieves the button that matches the given name (which should match the customId).
     * @param {string} buttonName The name matching the Button.name field
     * @returns {Button} The button that has a name matching buttonName
     */
    getButton(buttonName) {
        const button = this.#buttons.get(buttonName);

        if (!button) {
            throw new LookupError(
                `Tried to lookup button with name '${buttonName}' but it was not found!`,
                buttonName,
                this.#buttons,
            );
        }

        return button;
    }

    /**
     * Retrieves the selectMenu that matches the given name (which should match the customId).
     * @param {string} selectMenuName The name matching the SelectMenu.name field
     * @returns {SelectMenu} The button that has a name matching selectMenuName
     */
    getSelectMenu(selectMenuName) {
        const selectMenu = this.#selectMenus.get(selectMenuName);

        if (!selectMenu) {
            throw new LookupError(
                `Tried to lookup select menu with name '${selectMenuName}' but it was not found!`,
                selectMenuName,
                this.#selectMenus,
            );
        }

        return selectMenu;
    }

    /**
     * Retrieves the modal that matches the given name (which should match the customId).
     * @param {string} modalName The name matching the Modal.name field
     * @returns {Modal} The modal that has a name matching modalName
     */
    getModal(modalName) {
        const modal = this.#modals.get(modalName);

        if (!modal) {
            throw new LookupError(
                `Tried to lookup modal with name '${modalName}' but it was not found!`,
                modalName,
                this.#modals,
            );
        }

        return modal;
    }

    /**
     * Retrieves the context menu that matches the given name
     * @param {string} contextMenuName The name matching the ContextMenu.name field
     * @returns {ContextMenu} The context menu that has a name matching contextMenuName
     */
    getContextMenuCommand(contextMenuName) {
        const contextMenuCommand = this.#contextMenuCommands.get(contextMenuName);

        if (!contextMenuCommand) {
            throw new LookupError(
                `Tried to lookup context menu command with name '${contextMenuName}' but it was not found!`,
                contextMenuName,
                this.#contextMenuCommands,
            );
        }

        return contextMenuCommand;
    }
}

export default Bot;
