import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL, fileURLToPath } from 'url';
import { Collection } from 'discord.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Recursively fetch and load event files.
 * @param {Collection} collection The collection to populate with loaded events
 * @param {Client} client The client to pass to each event on construction
 * @param {path} dir The dirctory to search on this level
 */
async function loadEvents(collection, client, dir = '../events') {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    files.forEach(async (file) => {
        const stat = await fs.lstat(path.join(dirPath, file));
        if (stat.isDirectory()) {
            await loadEvents(collection, client, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const Event = (await import(pathToFileURL(path.join(dirPath, file)))).default;
            const event = new Event(client);
            event.startListener();
            collection.set(event.name, event);
        }
    });
}

/**
 * Recursively fetch and load slash command files.
 * @param {Collection} collection The collection to populate with loaded slash commands
 * @param {string} dir The directory to search on this level
 */
async function loadSlashCommands(collection, dir = '../slashcommands') {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    files.forEach(async (file) => {
        const stat = await fs.lstat(path.join(dirPath, file));
        if (stat.isDirectory()) {
            await loadSlashCommands(collection, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const Command = (await import(pathToFileURL(path.join(dirPath, file)))).default;
            const cmd = new Command();
            collection.set(cmd.name, cmd);
        }
    });
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
    files.forEach(async (fileName) => {
        const stat = await fs.lstat(path.join(dirPath, fileName));
        if (stat.isDirectory() && !inGroup) { // directory represents a subcommand group
            const groupCommands = new Collection();
            await loadSubcommandsActually(groupCommands, path.join(dir, fileName, true));
            collection.set(fileName, groupCommands);
        }
        if (fileName.endsWith('.js')) {
            const Command = (await import(pathToFileURL(path.join(dirPath, fileName)))).default;
            const cmd = new Command();
            collection.set(cmd.name, cmd);
        }
    });
}

/**
 * Loads subcommands and subcommand groups into the given collection. Subcommand groups are represented as a collection
 * with its respective subcommands as elements. A command is detected when a folder within the given subcommand
 * directory has given command name. Currently only supports commands that are directly in the subcommand directory.
 * @param {Collection} collection The collection to load subcommands into
 * @param {string} cmdName The name of the parent command
 * @param {string} dir The directory to search for subcommands
 */
async function loadSubcommands(collection, cmdName, dir = '../subcommands') {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    files.forEach(async (fileName) => {
        const stat = await fs.lstat(path.join(dirPath, fileName));
        if (stat.isDirectory() && fileName === cmdName) { // looking for a directory with the same name as the parent command
            await loadSubcommandsActually(collection, path.join(dir, fileName));
        }
    });
}

export { loadEvents, loadSlashCommands, loadSubcommands };
