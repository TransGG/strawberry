import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL, fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Get and load the slash commands. Same flow as this.loadEvents() without initalizing the listener
 */
async function loadCommands(client, dir = '../slashcommands') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    files.forEach(async (file) => {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) {
            await loadCommands(client, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const slashCommandName = file.split('.js')[0];
            const Command = (await import(pathToFileURL(path.join(filePath, file)))).default;
            const cmd = new Command(client, slashCommandName);
            client.slashCommands.set(cmd.name, cmd);
        }
    });
}

/**
 * Get and load the events. Loads all events within .js files within ../events/
 * and adds them to the corresponding collection member of this class
 */
async function loadEvents(client, dir = '../events') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    files.forEach(async (file) => {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) {
            await loadEvents(client, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const eventName = file.split('.js')[0];
            const Event = (await import(pathToFileURL(path.join(filePath, file)))).default;
            const event = new Event(client, eventName);
            event.startListener();
            client.events.set(event.name, event);
        }
    });
}

export { loadCommands, loadEvents };
