// courtesy of https://discordjs.guide/interactions/slash-commands.html
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
// import { token } from './config.json';
import 'dotenv/config'
import { readdirSync } from 'node:fs';

const token = process.env.TOKEN;

const commands = [];
const commandFiles = readdirSync('./slashcommands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '999892254808350811'; // elsie client id

for (const file of commandFiles) {
	// const command = require(`./slashcommands/${file}`);
    const command = await import(`./slashcommands/${file}`)
    console.log(command.data)
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
