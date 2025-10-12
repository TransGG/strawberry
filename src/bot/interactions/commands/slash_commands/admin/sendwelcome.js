import { SlashCommandBuilder } from 'discord.js';

import buildWelcomeComponents from '../../../../../content/buildWelcomeComponents.js';
import InteractionHelper from '../../../../utils/InteractionHelper.js';
import SlashCommand from '../../SlashCommand.js';
import config from '../../../../../config/config.js';

/**
 * Handler for sendwelcome slash command. Sends the welcome/rules message
 */
class SendWelcome extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'sendwelcome') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sends the welcome/rules message in this channel')
            .setDefaultMemberPermissions(0)
            .setDMPermission(false)
            .addBooleanOption((option) => option
                .setName('preview')
                .setDescription('Whether to preview the message'));
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        const preview = interaction.options.getBoolean('preview');
        await interaction.deferReply({ ephemeral: true });

        const messages = config.guilds[interaction.guild.id].rulesMessages.map(
            (message) => ({
                ...message,
                embeds: (message.embeds ?? []).map((embed) => ({
                    ...embed,
                    fields: (embed.fields ?? []).map((field) => {
                        const match = field.value.match(/{{(.*?)}}/);
                        if (!match) {
                            return field;
                        }
                        const extractedText = match[1];
                        const replacement = config.guilds[interaction.guild.id].links[extractedText];
                        return { ...field, value: field.value.replace(new RegExp(`{{${extractedText}}}`, 'g'), replacement) };
                    }),
                })),
            }),
        );

        messages[messages.length - 1].components = buildWelcomeComponents(
            interaction.client,
            interaction,
        );

        // eslint-disable-next-line no-restricted-syntax
        for (const message of messages) {
            if (preview) {
                // eslint-disable-next-line no-await-in-loop
                await InteractionHelper.reply(interaction, { ...message, components: [] }, true);
            } else {
                // eslint-disable-next-line no-await-in-loop
                await interaction.channel.send(message);
            }
        }

        if (!preview) {
            await InteractionHelper.reply(interaction, 'Sent!', true);
        }
    }
}

export default SendWelcome;
