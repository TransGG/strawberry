import { Client, Collection } from 'discord.js';
import { CommandNotFoundException } from './utils/errors.js';
import { loadSlashCommands, loadEvents, loadSubcommands } from './utils/loadFiles.js';
import { registerSlashCommands, deleteAllSlashCommands } from './utils/registerSlashCommands.js';

class Bot extends Client {
    // these collections are populated as a map with the name of the event/slash command/etc.
    // as the key and the content as the value
    #events = new Collection();

    #slashCommands = new Collection();

    /**
     * Run this function to get the bot going. Loads the necessary files to populate the members of the Bot, optionally
     * registers slash commands, then connects to Discord using the Discord API
     * @param {string} token The OAuth2 token to use to log in to the bot (see https://discord.com/developers/docs/topics/oauth2#bots)
     * @param {Object} [options={}] The options to be used while creating the bot
     * @param {boolean} [options.doRegisterSlashCommands=false] Will register slash commands if true, do nothing
     *     otherwise
     * @param {boolean} [options.clean=false] Will clear all slash commands from the target if true. This happens before
     *     registration of slash commands.
     * @param {Snowflake} [options.guildId=null] Specifies a guild to load slash commands into; commands will be
     *     registered globally if unspecified
     */
    async start(token, { doRegisterSlashCommands = false, clean = false, guildId = null } = {}) {
        // init
        await loadEvents(this.#events, this);
        await loadSlashCommands(this.#slashCommands);
        await loadSubcommands(this.#slashCommands);

        await super.login(token);

        // do requested command registration tasks (needs to wait on slashcommands to be loaded and client logged in)
        if (clean) {
            await deleteAllSlashCommands(this.user.id, guildId);
        } else if (doRegisterSlashCommands) {
            await registerSlashCommands(this.#slashCommands, this.user.id, guildId);
        }
    }

    /**
     * Retrieves the slash command that matches the given name.
     * @param {string} slashCommandName The name matching the SlashCommand.name field
     * @returns The slash command that has the same file name as the name given
     */
    getSlashCommand(slashCommandName) {
        const command = this.#slashCommands.get(slashCommandName);

        if (!command) {
            throw new CommandNotFoundException(slashCommandName);
        }

        return command;
    }
}

export default Bot;
