import {
    bold,
    codeBlock,
    italic,
    SlashCommandSubcommandBuilder,
} from 'discord.js';
import google from 'googleapis';
import SubCommand from '../../Subcommand.js';

/**
 * Handler for old subcommand of theo command.
 */
class Old extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'old') {
        super(name);
    }

    /**
     * @returns {SlashCommandSubcommandBuilder} The data that describes the command format to the
     *     Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('Check the old verification of a user')
            .addStringOption((option) => option.setName('query')
                .setDescription('What is the query you would like to use?')
                .setRequired(true));
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the
     *     slash command was executed
     */
    async run(interaction) {
        await interaction.deferReply({
            ephemeral: true,
        });

        const auth = new google.auth.GoogleAuth({
            keyFile: './drive.json',
            scopes: [
                'https://www.googleapis.com/auth/drive.readonly',
            ],
        });

        const driveService = google.drive({
            version: 'v3',
            auth,
        });

        const userId = interaction.options.getString('query');
        try {
            const response = await driveService.files.list({
                maxResults: 1,
                q: `mimeType='text/plain' and name contains '${userId}'`,
            });

            const file = await driveService.files.get({
                fileId: response.data.files[0].id,
                alt: 'media',
            });

            await interaction.editReply({
                content: `${bold(italic('Found File With Name:'))}${codeBlock(`"${response.data.files[0].name}"`)}`,
                files: [{
                    attachment: Buffer.from(file.data, 'utf8'),
                    name: `${response.data.files[0].name.match(/\(([^)]+)\)/)[1]} verification log.txt`,
                }],
            });
        } catch {
            await interaction.editReply('404 File not found');
        }
    }
}

export default Old;
