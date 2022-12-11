import fs from 'fs';
import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for version slash command. Retrieves the version (currently from package.json)
 */
class Version extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'version') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Get bot version');
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        const data = JSON.parse(await fs.promises.readFile('./package.json'));

        await interaction.reply({
            content: `Current version is ${data?.version ?? 'unknown'}`,
            ephemeral: true,
        });
    }
}

export default Version;
