import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL, fileURLToPath } from 'url';
import { Client, Collection } from 'discord.js';
import SlashCommandWithSubcommands from '../interactions/commands/SlashCommandWithSubcommands.js';
import { DuplicateElementException } from './errors.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// default paths to use to search for files
const eventsPath = '../events';
const slashCommandsPath = '../interactions/commands/slashcommands';
const subcommandsPath = '../interactions/commands/subcommands';
const buttonsPath = '../interactions/messagecomponents/buttons';
const selectMenusPath = '../interactions/messagecomponents/selectmenus';
const modalsPath = '../interactions/modals';
const contextMenuCommandsPath = '../interactions/commands/contextmenucommands';

/**
 * Recursively loads and instantiates any class that has a .name function and maps the value returned by .data to an
 * the instance of the class in the passed collection.
 * @param {Map} collection The collection to populate with class instances
 * @param {string} dir The directory to search on this level
 * @param {function} [callback] The function to call after an instantiation, with the instance passed as a parameter
 *     along with the instanceArgs
 * @param {Array} [instanceArgs=[]] The arguments to pass to the instance
 * @param {Array} [callbackArgs=[]] The arguments to pass to the callback function. They are preceded by the instance as
 *     an argument
 */
async function loadNameable(collection, dir, callback, instanceArgs = [], callbackArgs = []) {
    if (!dir) {
        throw new Error(`Cannot load files: dir has value of ${dir}!`);
    }
    const dirPath = path.join(__dirname, dir);

    // collection validity checking
    if (!collection) {
        throw new ReferenceError(`Cannot load files in ${dirPath}: argument 'collection' does not exist!`);
    }
    if (!(collection instanceof Map)) {
        throw new TypeError(`Cannot load files in ${dirPath}: expected argument 'collection' to be of type Map (probably a Collection) when 'collection' was of type ${collection.constructor.name}!`);
    }

    const files = await fs.readdir(dirPath).catch((error) => {
        throw new Error(`Couldn't load files: promise rejection when loading files for ${dirPath} (resolved from ${dir})!`, { cause: error });
    });
    await Promise.all(
        files.map(async (fileName) => {
            const filePath = path.join(dirPath, fileName);
            const stat = await fs.lstat(filePath);
            if (stat.isDirectory()) {
                await loadNameable(collection, path.join(dir, fileName), callback);
            }
            if (fileName.endsWith('.js')) {
                const Class = (await import(pathToFileURL(filePath))).default;
                const instance = new Class(...instanceArgs);
                if (!(Object.hasOwn(instance, 'name'))) {
                    throw new Error(`Tried to instantiate class ${Class.name} found at ${filePath} but the instance did not have a value for required property 'name'!`);
                }
                if (collection.has(instance.name)) {
                    throw new DuplicateElementException(filePath, instance.name, collection);
                }
                collection.set(instance.name, instance);
                if (callback) {
                    await callback(instance, ...callbackArgs);
                }
            }
        }),
    );
}

/**
 * Recursively fetch and load event files into the collection.
 * @param {Map} collection The collection to populate with loaded events
 * @param {Client} client The client to pass to each event on construction
 * @param {string} [dir=this.eventsPath] The directory to search on this level
 */
async function loadEvents(collection, client, dir = eventsPath) {
    if (!client) {
        throw new ReferenceError('Cannot load events: argument \'client\' does not exist!');
    }
    if (!(client instanceof Client)) {
        throw new TypeError(`Cannot load events: expected argument client to be of type Client when client was of type ${client.constructor.name}`);
    }
    await loadNameable(
        collection,
        dir,
        (event) => {
            event.startListener();
        },
        [
            client,
        ],
    );
}

/**
 * Recursively fetch and load slash command files into the collection.
 * @param {Map} collection The collection to populate with loaded slash commands
 * @param {string} [dir=this.slashCommandsPath] The directory to search on this level
 */
async function loadSlashCommands(collection, dir = slashCommandsPath) {
    await loadNameable(collection, dir);
}

/**
 * Recursively fetch and load button files into the collection.
 * @param {Map} collection The collection to populate with loaded button classes
 * @param {string} [dir=this.buttonsPath] The directory to search on this level
 */
async function loadButtons(collection, dir = buttonsPath) {
    await loadNameable(collection, dir);
}

/**
 * Recursively fetch and load button files into the collection.
 * @param {Map} collection The collection to populate with loaded button classes
 * @param {string} [dir=this.selectMenusPath] The directory to search on this level
 */
async function loadSelectMenus(collection, dir = selectMenusPath) {
    await loadNameable(collection, dir);
}

/**
 * Recursively fetch and load button files into the collection.
 * @param {Map} collection The collection to populate with loaded button classes
 * @param {string} [dir=this.modalsPath] The directory to search on this level
 */
async function loadModals(collection, dir = modalsPath) {
    await loadNameable(collection, dir);
}

/**
 * Recursively fetch and load button files into the collection.
 * @param {Map} collection The collection to populate with loaded button classes
 * @param {string} [dir=this.contextMenuCommandsPath] The directory to search on this level
 */
async function loadContextMenuCommands(collection, dir = contextMenuCommandsPath) {
    await loadNameable(collection, dir);
}

/**
 * Helper function that does the actual the loading of commands
 * @param {Map} collection The collection to put subcommands into
 * @param {string} dir The directory to search for files
 * @param {boolean} [inGroup=false] Whether this function call is in directory that represents a subcommand group
 */
async function loadSubcommandsActually(collection, dir, inGroup = false) {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath).catch((error) => {
        throw new Error(`Couldn't load files: promise rejection when loading files for ${dirPath} (resolved from ${dir})!`, { cause: error });
    });
    await Promise.all(
        files.map(async (fileName) => {
            const filePath = path.join(dirPath, fileName);
            const stat = await fs.lstat(filePath);
            if (stat.isDirectory() && !inGroup) { // directory represents a subcommand group
                if (collection.has(fileName)) {
                    throw new DuplicateElementException(dirPath, fileName, collection);
                }
                const groupCommands = new Collection();
                await loadSubcommandsActually(groupCommands, path.join(dir, fileName), true);
                collection.set(fileName, groupCommands);
            }
            if (fileName.endsWith('.js')) {
                const Command = (await import(pathToFileURL(filePath))).default;
                const cmd = new Command();
                if (collection.has(cmd.name)) {
                    throw new DuplicateElementException(filePath, cmd.name, collection);
                }
                collection.set(cmd.name, cmd);
            }
        }),
    );
}

/**
 * Loads subcommands and subcommand groups into the commands in the given collection. Subcommand groups are represented
 * as a collection with its respective subcommands as elements. A command is detected when a folder within the given
 * subcommand directory has given command name. Currently only supports commands that are directly in the subcommand
 * directory.
 * @param {Map <string, SlashCommand>} commands The collection that contains the commands to load subcommands into
 * @param {string} [dir=this.subcommandsPath] The directory to search for subcommands
 */
async function loadSubcommands(commands, dir = subcommandsPath) {
    // commands validity checking
    if (!commands) {
        throw new ReferenceError('Cannot load subcommands: argument \'commands\' does not exist!');
    }
    if (!(commands instanceof Map)) {
        throw new TypeError('Cannot load subcommands: expected argument \'commands\' to be a Map (probably a Collection)!');
    }
    if (commands.size === 0) {
        throw new RangeError('Cannot load subcommands: size of commands is 0! (zero, not one you smart aleck)');
    }

    // get files within subcommands directory
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath).catch((error) => {
        throw new Error(`Couldn't load files: promise rejection when loading files for ${dirPath} (resolved from ${dir})!`, { cause: error });
    });
    await Promise.all(
        files.map(async (fileName) => {
            // try to match a directory name with a command name
            const stat = await fs.lstat(path.join(dirPath, fileName));
            if (stat.isDirectory()) {
                // get command with matching name
                const command = commands.get(fileName);

                // check command validity
                if (!command) {
                    throw new Error(`Found directory ${fileName} in ${dirPath}, but ${fileName} does not match the name of any commands!`);
                }
                if (!(command instanceof SlashCommandWithSubcommands)) {
                    throw new TypeError(`Retrieved command for key ${fileName} but the value was not of type SlashCommandWithSubcommand!`);
                }

                // create and populate children
                const children = new Collection();
                await loadSubcommandsActually(children, path.join(dir, fileName));

                // apply children to command
                command.addChildren(children);
            } else { // file is not a directory, so it's a file
                console.error(`Warning: found file ${fileName} directly in ${dirPath} while looking for subcommands. Subcommands are expected to be found within a subdirectory of the subcommands directory.`);
            }
        }),
    );
}

export {
    loadEvents,
    loadSlashCommands,
    loadSubcommands,
    loadButtons,
    loadSelectMenus,
    loadContextMenuCommands,
    loadModals,
};
