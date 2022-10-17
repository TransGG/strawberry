import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';

// courtesy of https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script

/**
 * Deletes all slash commands, in a specific guild or globally based on the parameters.
 * @param {Snowflake} clientId The id of the client (the bot) that is registering slash commands
 * @param {Snowflake} [guildId=null] The id of the guild to delete a guild command in. Will delete commands globally if
 *     unspecified
 */
async function deleteAllSlashCommands(clientId, guildId = null) {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

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
}

/**
 * Deletes a specific slash command, in a specific guild or globally based on the parameters.
 * @param {Snowflake} clientId The id of the client (the bot) that is registering slash commands
 * @param {Snowflake} commandId The id of the command to delete (see https://discordjs.guide/creating-your-bot/deleting-commands.html#deleting-specific-commands)
 * @param {Snowflake} [guildId=null] The id of the guild to delete a guild command in. Will delete commands globally if
 *     unspecified
 */
async function deleteSlashCommand(clientId, commandId, guildId = null) {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

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
 * Registers the slash commands of the bot, in a specific guild or globally. Must be used when updating properties of
 * slash commands for the change to be reflected in the guilds but unnecessary for normal operation.
 * @param {Collection} slashCommands A Collection that maps the name of the slash command to an object that contains the
 *     registration data
 * @param {Snowflake} clientId The id of the client (the bot) that is registering slash commands
 * @param {Object} [options={}] The options for registering commands
 * @param {boolean} [options.clean=false] Will clear all slash commands from the target before registering them
 * @param {Snowflake} [options.guildId=null] Specifies a guild to load slash commands into; commands will be registered
 *     globally if unspecified
 */
async function registerSlashCommands(slashCommands, clientId, guildId = null) {
    const slashCommandsData = slashCommands.map((command) => command.data.toJSON());

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    if (guildId) { // for guild-based commands
        console.log(`Started registering ${slashCommandsData.length} application commands in guild ${guildId}.`);
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommandsData })
            .then((data) => console.log(`Successfully registered ${data.length} application commands in guild `
                + `${guildId}.`))
            .catch(console.error);
    } else { // for global commands
        console.log(`Started registering ${slashCommandsData.length} application commands.`);
        await rest.put(Routes.applicationCommands(clientId), { body: slashCommandsData })
            .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
            .catch(console.error);
    }
}

export { deleteAllSlashCommands, deleteSlashCommand, registerSlashCommands };
