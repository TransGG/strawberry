import { Client, Collection } from 'discord.js';
import { loadSlashCommands, loadEvents } from './utils/loadFiles.js';
import registerSlashCommands from './utils/registerSlashCommands.js';

class Bot extends Client {
    // these collections are populated as a map with the name of the event/slash command/etc.
    // as the key and the content as the value
    #events = new Collection();

    #slashCommands = new Collection();

    /**
     * Run this function to get the bot going. Loads the necessary files to populate the members of the Bot, optionally
     * registers slash commands, then connects to Discord using the Discord API
     * @param {string} token The OAuth2 token to use to log in to the bot (see https://discord.com/developers/docs/topics/oauth2#bots)
     * @param {boolean} doRegisterSlashCommands Will register slash commands if true, do nothing otherwise
     */
    async start(token, doRegisterSlashCommands) {
        await loadEvents(this.#events, this);
        await loadSlashCommands(this.#slashCommands);

        await super.login(token);

        if (doRegisterSlashCommands) { // needs to wait on slashcommands to be loaded and client logged in
            registerSlashCommands(this.#slashCommands, this.user.id);
        }
    }

    /**
     * Retrieves the slash command that matches the given name.
     * @param {string} slashCommandName The name matching the SlashCommand.name field
     * @returns The slash command that has the same file name as the name given
     */
    getSlashCommand(slashCommandName) {
        return this.#slashCommands.get(slashCommandName);
    }
}

export default Bot;
