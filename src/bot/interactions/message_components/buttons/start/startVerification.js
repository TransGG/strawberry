import {
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import {
    verbose,
} from '../../../../../config/out.js';
import Button from '../../Button.js';
import {
    buildPromptSelectComponents,
} from '../../../../../content/verification.js';
import config from '../../../../../config/config.js';
import { isVerified } from '../../../../../verification/controllers/member.js';

/**
 * Handler for startVerification button. Puts a user into the verification process
 */
class StartVerification extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'startVerification') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Start Verification')
            .setStyle(ButtonStyle.Success);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        verbose(`Request to start pre-verification select for ${interaction.user.tag} ${interaction.member.id}`);
        let verified = false;

        // check if user is verified
        if (isVerified(interaction.member)) {
            interaction.reply({
                content: 'You\'ve already been verified, silly!',
                ephemeral: true,
            });
            verified = true;
        }

        if (!verified) {
            const guildIds = config.guilds[interaction.member.guild.id].sync;
            await Promise.all(
                guildIds.map(async (guildId) => {
                    const guild = interaction.client.guilds.cache.get(guildId);

                    if (!guild) {
                        return;
                    }

                    try {
                        const memberInGuild = await guild.members.fetch(interaction.member.id);
                        const hasVerifiedRole = memberInGuild.roles.cache.has(
                            config.guilds[guildId].roles.verified,
                        );

                        if (hasVerifiedRole) {
                            await interaction.member.roles.add(
                                config.guilds[interaction.member.guild.id].roles.verified,
                                `Verified in ${memberInGuild.guild.name} | Auto adding member role from synced community.`,
                            );

                            const logChannel = interaction.member.guild.channels.cache.get(
                                config.guilds[interaction.member.guild.id].channels.verifyLogs,
                            );
                            const logChannel2 = guild.channels.cache.get(
                                config.guilds[guildId].channels.verifyLogs,
                            );

                            if (logChannel) {
                                logChannel.send({
                                    content: `<@${interaction.member.user.id}> (${interaction.member.user.id}) is already verified in \`${guild.name}\` (${guild.id}). They have been auto verified.`,
                                });
                            }

                            if (logChannel2) {
                                logChannel2.send({
                                    content: `<@${interaction.member.user.id}> (${interaction.member.user.id}) has joined \`${interaction.member.guild.name}\` (${interaction.member.guild.id}) and has been auto verified due to being verified in this community.`,
                                });
                            }

                            await interaction.reply({
                                content: 'Verified!',
                                ephemeral: true,
                            });

                            verified = true;
                        }
                    } catch (err) {
                        console.log(`Failed to fetch member in ${guild.name}, user likely isn't in guild.`);
                    }
                }),
            );
        }

        if (!verified) {
            interaction.reply({
                content: 'Please select one of the following you best identify with, choosing one option over another will not affect your verification in any way, rather will only slightly change the questions to best fit your identity.',
                components: buildPromptSelectComponents(interaction.guild.id),
                ephemeral: true,
            });
        }
    }
}

export default StartVerification;
