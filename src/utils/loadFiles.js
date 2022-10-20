import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL, fileURLToPath } from 'url';
import { Collection } from 'discord.js';
import SlashCommandWithSubcommands from '../interactions/commands/SlashCommandWithSubcommands.js';
import { DuplicateElementException } from './errors.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// default paths to use to search for files
const eventsPath = '../events';
const slashCommandsPath = '../interactions/commands/slashcommands';
const subcommandsPath = '../interactions/commands/subcommands';
const buttonsPath = '../interactions/messagecomponents/buttons';

/**
 * Recursively fetch and load event files.
 * @param {Collection} collection The collection to populate with loaded events
 * @param {Client} client The client to pass to each event on construction
 * @param {path} dir The directory to search on this level
 */
async function loadEvents(collection, client, dir = eventsPath) {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    await Promise.all(
        files.map(async (fileName) => {
            const stat = await fs.lstat(path.join(dirPath, fileName));
            if (stat.isDirectory()) {
                await loadEvents(collection, client, path.join(dir, fileName));
            }
            if (fileName.endsWith('.js')) {
                const Event = (await import(pathToFileURL(path.join(dirPath, fileName)))).default;
                const event = new Event(client);
                event.startListener();
                if (collection.has(event.name)) {
                    throw new DuplicateElementException(path.join(dirPath, fileName), event.name, collection);
                }
                collection.set(event.name, event);
            }
        }),
    );
}

/**
 * Recursively fetch and load slash command files.
 * @param {Collection} collection The collection to populate with loaded slash commands
 * @param {string} dir The directory to search on this level
 */
async function loadSlashCommands(collection, dir = slashCommandsPath) {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    await Promise.all(
        files.map(async (fileName) => {
            const stat = await fs.lstat(path.join(dirPath, fileName));
            if (stat.isDirectory()) {
                await loadSlashCommands(collection, path.join(dir, fileName));
            }
            if (fileName.endsWith('.js')) {
                const Command = (await import(pathToFileURL(path.join(dirPath, fileName)))).default;
                const cmd = new Command();
                if (collection.has(cmd.name)) {
                    throw new DuplicateElementException(path.join(dirPath, fileName), cmd.name, collection);
                }
                collection.set(cmd.name, cmd);
            }
        }),
    );
}

/**
 * Helper function to process the loading of commands
 * @param {Collection} collection The collection to put subcommands into
 * @param {string} dir The directory to search for files
 * @param {boolean} inGroup Whether this function call is in directory that represents a subcommand group
 */
async function loadSubcommandsActually(collection, dir, inGroup = false) {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    await Promise.all(
        files.map(async (fileName) => {
            const stat = await fs.lstat(path.join(dirPath, fileName));
            if (stat.isDirectory() && !inGroup) { // directory represents a subcommand group
                if (collection.has(fileName)) {
                    throw new DuplicateElementException(dirPath, fileName, collection);
                }
                const groupCommands = new Collection();
                await loadSubcommandsActually(groupCommands, path.join(dir, fileName), true);
                collection.set(fileName, groupCommands);
            }
            if (fileName.endsWith('.js')) {
                const Command = (await import(pathToFileURL(path.join(dirPath, fileName)))).default;
                const cmd = new Command();
                if (collection.has(cmd.name)) {
                    throw new DuplicateElementException(path.join(dirPath, fileName), cmd.name, collection);
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
 * @param {Collection} commands The collection of commands to load subcommands into
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
    const files = await fs.readdir(dirPath);
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

/**
 * Recursively fetch and load button files.
 * @param {Collection} collection The collection to populate with loaded button classes
 * @param {string} dir The directory to search on this level
 */
async function loadButtons(collection, dir = buttonsPath) {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    await Promise.all(
        files.map(async (fileName) => {
            const stat = await fs.lstat(path.join(dirPath, fileName));
            if (stat.isDirectory()) {
                await loadButtons(collection, path.join(dir, fileName));
            }
            if (fileName.endsWith('.js')) {
                const Button = (await import(pathToFileURL(path.join(dirPath, fileName)))).default;
                const button = new Button();
                if (collection.has(button.name)) {
                    throw new DuplicateElementException(path.join(dirPath, fileName), button.name, collection);
                }
                collection.set(button.name, button);
            }
        }),
    );
}

export {
    loadEvents,
    loadSlashCommands,
    loadSubcommands,
    loadButtons,
};
