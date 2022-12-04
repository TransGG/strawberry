import { bold, codeBlock, SlashCommandBuilder } from 'discord.js';
import { isTicket, parseApplicantId } from '../../../../../verification/controllers/ticket.js';
import ban from '../../../../../verification/managers/ban.js';
import { denyVerification, DenyConsequence } from '../../../../../verification/managers/denyVerification.js';
import VerificationError from '../../../../../verification/verificationError.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for ban slash command.
 */
class Ban extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'ban') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Ban via id')
            .addUserOption((option) => option
                .setName('user')
                .setDescription('User to ban')
                .setRequired(true))
            .addStringOption((option) => option
                .setName('reason')
                .setDescription('Reason for ban (sent to user')
                .setRequired(true))
            .addStringOption((option) => option
                .setName('log-reason')
                .setDescription('Reason for ban (kept in logs)'));
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        const target = interaction.options.getUser('user');
        const userReason = interaction.options.getString('reason');
        const logReason = interaction.options.getString('log-reason') ?? ''; // since logReason is optional

        // if this command is ran inside a ticket belonging to the target this becomes a deny
        if (isTicket(interaction.channel) && parseApplicantId(interaction.channel) === target.id) {
            await denyVerification(
                DenyConsequence.ban,
                {
                    ticket: interaction.channel,
                    verifier: interaction.member,
                    userReason,
                    logReason,
                    applicant: target,
                },
                (message) => interaction.reply({ content: message, ephemeral: true }),
            ).catch(async (error) => {
                if (error instanceof VerificationError) {
                    await interaction.reply({ content: error.message, ephemeral: true });
                } else {
                    await interaction.reply({
                        content: `Error: ${error.message}`,
                        ephemeral: true,
                    });
                    throw error;
                }
            });
            return;
        }

        // otherwise, ban user
        try {
            await ban(
                { reason: 'Member was banned by verifier' },
                {
                    target,
                    verifier: interaction.member,
                    userReason,
                    logReason,
                    dmMessage: `You have been banned from ${bold(interaction.guild.name)} for the following reason:\n${codeBlock(userReason)}`,
                },
            );

            await interaction.reply({
                content: `Banned ${target.tag} from the server.`,
                ephemeral: true,
            });
        } catch (error) {
            if (error instanceof VerificationError) {
                await interaction.reply({ content: error.message, ephemeral: true });
            } else {
                await interaction.reply({ content: `Error: ${error.message}`, ephemeral: true });
                throw error;
            }
        }
    }
}

export default Ban;
