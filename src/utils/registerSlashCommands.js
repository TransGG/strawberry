import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';

/**
 * Registers the slash commands with all of the bot's guilds. Must be used when updating properties of slash
 * commands for the change to be reflected in the guilds but unnecessary for normal operation.
 */
function registerSlashCommands(slashCommands, clientId) {
    // courtesy of https://discordjs.guide/interactions/slash-commands.html
    const slashCommandsData = [];
    slashCommands.forEach((slashCommand) => {
        slashCommandsData.push(slashCommand.data.toJSON());
    });
    const rest = new REST({ version: '10' }).setToken(process.env.token);
    (async () => {
        try {
            console.log(`Started refreshing ${slashCommandsData.length} application (/) commands.`);

            const data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: slashCommandsData },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
}

export default registerSlashCommands;
