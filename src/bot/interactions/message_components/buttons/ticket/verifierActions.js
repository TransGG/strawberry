import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} from 'discord.js';
import Button from '../../Button.js';
import { isVerifier } from '../../../../../verification/controllers/member.js';

/**
 * Handler for verifierActions button. Brings up menu for verifiers to choose actions from.
 */
class VerifierActions extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'verifierActions') {
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
        if (!isVerifier(interaction.member)) {
            await interaction.reply({
                content: 'You are not a verifier',
                ephemeral: true,
            });
            return;
        }

        // send verifier actions message
        const actions = new EmbedBuilder()
            .setDescription('Which action would you like to take?')
            .setFooter({
                text: interaction.client.user.tag,
                iconURL: interaction.client.user.avatarURL(),
            });

        await interaction.reply({
            embeds: [actions],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        interaction.client.getButton('verifyUser'),
                        interaction.client.getButton('sendAsTheo'),
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        interaction.client.getButton('denyKickButton'),
                        interaction.client.getButton('denyBanButton'),
                    ),
            ],
            ephemeral: true,
        });
    }
}

export default VerifierActions;
