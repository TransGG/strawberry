import { Client, Collection } from 'discord.js';
import { verbose } from '../config/out.js';
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
import {
    registerApplicationCommands,
    deleteAllApplicationCommands,
} from './utils/registerApplicationCommands.js';

class Bot extends Client {
    // these collections are populated as a map with the name of the event/slash command/etc. as the
    // key and an instance of its respective class as the value
    #events = new Collection();

    #slashCommands = new Collection();

    #buttons = new Collection();

    #selectMenus = new Collection();

    #modals = new Collection();

    #contextMenuCommands = new Collection();

    #userLeaveMutexes = new Set();

    /**
     * Run this function to get the bot going. Loads the necessary files to populate the members of
     * the Bot, connects to Discord using the Discord API, then optionally registers application
     * commands
     * @param {string} token The OAuth2 token to use to log in to the bot (see
     * https://discord.com/developers/docs/topics/oauth2#bots)
     * @param {Object} [options={}] The options to be used while starting the bot
     * @param {boolean} [options.registerCommands=false] Will register application commands if true,
     *     do nothing otherwise
     * @param {boolean} [options.clean=false] Will clear all application commands if true. Will
     *     clear only global commands if guildId is not set or will clear only commands in the
     *     specified guild if guildId is set. This happens before registration of commands
     * @param {Snowflake} [options.guildId=null] Specifies a guild to clear application commands
     *     from.
     */
    async start(token, { registerCommands = false, clean = false, guildId = null } = {}) {
        // load files
        verbose('Starting client');

        // init
        verbose('----------- Loading files -----------');
        await Promise.all([
            loadSlashCommands(this.#slashCommands).then(async () => {
                await loadSubcommands(this.#slashCommands);
            }),
            loadContextMenuCommands(this.#contextMenuCommands),
            loadButtons(this.#buttons),
            loadSelectMenus(this.#selectMenus),
            loadModals(this.#modals),
            loadEvents(this.#events, this),
        ]);
        verbose('--------- Done loading files --------');

        // command registration
        if (clean) {
            await deleteAllApplicationCommands(guildId);
        }
        if (registerCommands) {
            const commands = this.#slashCommands.concat(this.#contextMenuCommands);

            // partition commands into global commands and guild-specific commands grouped on their
            // guild
            const partition = commands.reduce((result, cur) => {
                if (cur.guild) {
                    if (!result[cur.guild]) {
                        // eslint-disable-next-line no-param-reassign
                        result[cur.guild] = [];
                    }
                }
                result[cur.guild ? cur.guild : 'globals'].push(cur);
                return result;
            }, { globals: [] });

            const { globals, ...guilds } = partition;

            // register global commands
            await registerApplicationCommands(globals);

            // register guild-specific commands
            await Promise.all(
                Object.entries(guilds).map(async (element) => {
                    const [guild, guildCommands] = element;
                    await registerApplicationCommands(guildCommands, guild);
                }),
            );
        }

        // login
        verbose('Logging in to Discord...');

        await super.login(token);

        verbose('Done logging in to Discord');
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
            throw new LookupError('button', buttonName, this.#buttons);
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
                'select menu',
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
            throw new LookupError('modal', modalName, this.#modals);
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
                'context menu command',
                contextMenuName,
                this.#contextMenuCommands,
            );
        }

        return contextMenuCommand;
    }

    /**
     * Adds a user id to a list of users who are undergoing leave operations that are mutually
     * exclusive with other leave operations
     * @param {Snowflake} id The id of the user that is undergoing mutex leave operations
     */
    addUserLeaveMutex(id) {
        this.#userLeaveMutexes.add(this.users.resolveId(id));
    }

    /**
     * Removes a user id from a list of users who are undergoing leave operations that are mutually
     * exclusive with other leave operations
     * @param {Snowflake} id The id of the user that is undergoing mutex leave operations
     */
    removeUserLeaveMutex(id) {
        this.#userLeaveMutexes.delete(this.users.resolveId(id));
    }

    /**
     * Checks if a user id is in a list of users who are undergoing leave operations that are
     * mutually exclusive with other leave operations
     * @param {Snowflake} id The id of the user that is undergoing mutex leave operations
     */
    isUserLeaveMutex(id) {
        return this.#userLeaveMutexes.has(id);
    }
}

export default Bot;
