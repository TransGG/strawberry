import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL, fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Recursively fetch and load slash command files.
 * @param {Collection} slashCommands The collection to populate with loaded slash commands
 * @param {string} dir The directory to search on this level
 */
async function loadSlashCommands(slashCommands, dir = '../slashcommands') {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    files.forEach(async (file) => {
        const stat = await fs.lstat(path.join(dirPath, file));
        if (stat.isDirectory()) {
            await loadSlashCommands(slashCommands, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const Command = (await import(pathToFileURL(path.join(dirPath, file)))).default;
            const cmd = new Command();
            slashCommands.set(cmd.name, cmd);
        }
    });
}

/**
 * Recursively fetch and load event files.
 * @param {Collection} events The collection to populate with loaded events
 * @param {Client} client The client to pass to each event on construction
 * @param {path} dir The dirctory to search on this level
 */
async function loadEvents(events, client, dir = '../events') {
    const dirPath = path.join(__dirname, dir);
    const files = await fs.readdir(dirPath);
    files.forEach(async (file) => {
        const stat = await fs.lstat(path.join(dirPath, file));
        if (stat.isDirectory()) {
            await loadEvents(events, client, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const Event = (await import(pathToFileURL(path.join(dirPath, file)))).default;
            const event = new Event(client);
            event.startListener();
            events.set(event.name, event);
        }
    });
}

export { loadSlashCommands, loadEvents };
