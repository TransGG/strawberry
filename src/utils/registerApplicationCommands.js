import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import config from '../config/config.js';
import { debug, verbose } from '../config/out.js';

// courtesy of https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration and https://discordjs.guide/slash-commands/deleting-commands.html
const { clientId, token } = config;

/**
 * Deletes all application commands, either in a specific guild or globally based on the parameters.
 * @param {Snowflake} [guildId=null] The id of the guild to delete a guild command in. Will delete commands globally if
 *     unspecified
 */
async function deleteAllApplicationCommands(guildId = null) {
    verbose(`Deleting application commands: guildId set to ${guildId}`);

    const rest = new REST({ version: '10' }).setToken(token);

    if (guildId) { // for guild-based commands
        console.log(`Started to delete application commands in guild ${guildId}.`);
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
            .then(() => console.log(`Successfully deleted all guild commands in guild ${guildId}.`))
            .catch(console.error);
    } else { // for global commands
        console.log('Started to delete application commands.');
        await rest.put(Routes.applicationCommands(clientId), { body: [] })
            .then(() => console.log('Successfully deleted all application commands.'))
            .catch(console.error);
    }

    verbose('Done deleting commands');
}

/**
 * Deletes a specific application command, either in a specified guild or globally based on the parameters.
 * @param {Snowflake} commandId The id of the command to delete (see https://discordjs.guide/slash-commands/deleting-commands.html#deleting-specific-commands)
 * @param {Snowflake} [guildId=null] The id of the guild to delete a guild command in. Will delete commands globally if
 *     unspecified
 */
async function deleteApplicationCommand(commandId, guildId = null) {
    const rest = new REST({ version: '10' }).setToken(token);

    if (guildId) { // for guild-based commands
        console.log(`Started to delete application command with id: ${commandId} in guild ${guildId}.`);
        await rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
            .then(() => console.log(`Successfully deleted guild command ${commandId} in guild ${guildId}.`))
            .catch(console.error);
    } else { // for global commands
        console.log(`Started to delete application command with id: ${commandId}.`);
        await rest.delete(Routes.applicationCommand(clientId, commandId))
            .then(() => console.log(`Successfully deleted application command ${commandId}.`))
            .catch(console.error);
    }
}

/**
 * Registers the application commands (slash commands or context menu commands) of the bot, either in a specified guild
 * or globally. Must be used when updating properties of application commands for the change to be reflected in the
 * guilds, but otherwise unnecessary for normal operation.
 * @param {Map|Array} commands A collection that contains the registration data. Each element must have a toJSON()
 *     method.
 * @param {Snowflake} [guildId=null] Specifies a guild to load commands into; commands will be registered globally if
 *     unspecified
 */
async function registerApplicationCommands(commands, guildId = null) {
    verbose(`Registering application commands: guildId set to ${guildId}`);
    debug('Application commands to register:\n', commands);

    const commandsData = commands.map((command) => command.toJSON());

    const rest = new REST({ version: '10' }).setToken(token);

    if (guildId) { // for guild-based commands
        console.log(`Started registering ${commandsData.length} application commands in guild ${guildId}.`);
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsData })
            .then((data) => console.log(`Successfully registered ${data.length} application commands in guild ${guildId}.`))
            .catch(console.error);
    } else { // for global commands
        console.log(`Started registering ${commandsData.length} application commands.`);
        await rest.put(Routes.applicationCommands(clientId), { body: commandsData })
            .then((data) => {
                console.log(`Successfully registered ${data.length} application commands.`);
            })
            .catch(console.error);
    }

    verbose('Done registering application commands');
}

export { deleteAllApplicationCommands, deleteApplicationCommand, registerApplicationCommands };
