import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} from 'discord.js';
import config from '../../../../../config/config.js';
import Button from '../../Button.js';

/**
 * Handler for VERIFIER_ACTIONS button. Brings up menu for verifiers to choose actions from.
 */
class VerifierActions extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'VERIFIER_ACTIONS') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Verifier Actions (Staff Only)')
            .setStyle(ButtonStyle.Danger);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        // Check if the current member is a verifier
        if (!interaction.member.roles.cache.has(config.roles.verifier)) {
            await interaction.reply({
                content: 'You are not a verifier',
                ephemeral: true,
            });
            return;
        }

        const actions = new EmbedBuilder()
            .setDescription('Which action would you like to take?')
            .setFooter({
                text: `${interaction.client.user.tag}`,
                iconURL: interaction.client.user.avatarURL(),
            });

        await interaction.reply({
            embeds: [actions],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        interaction.client.getButton('VERIFY_USER'),
                        interaction.client.getButton('KICK_USER_MODAL'),
                        interaction.client.getButton('THEO_SEND_MODAL'),
                    ),
            ],
            ephemeral: true,
        });
    }
}
export default VerifierActions;
