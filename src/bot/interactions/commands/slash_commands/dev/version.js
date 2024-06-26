import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

import InteractionHelper from '../../../../utils/InteractionHelper.js';
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
            .setDefaultMemberPermissions(0)
            .setDMPermission(false)
            .setDescription('Get bot version');
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        await InteractionHelper.deferReply(interaction, true);

        const data = JSON.parse(await fs.promises.readFile('./package.json'));

        await InteractionHelper.reply(
            interaction,
            `Current version is ${data?.version ?? 'unknown'}`,
            true,
        );
    }
}

export default Version;
