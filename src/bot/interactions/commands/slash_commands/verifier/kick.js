import { bold, codeBlock, SlashCommandBuilder } from 'discord.js';
import { isTicket } from '../../../../../verification/controllers/ticket.js';
import { denyVerification, DenyConsequence } from '../../../../../verification/managers/denyVerification.js';
import kick from '../../../../../verification/managers/kick.js';
import VerificationError from '../../../../../verification/verificationError.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for kick slash command.
 */
class Kick extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'kick') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Kicks  user')
            .addUserOption((option) => option
                .setName('user')
                .setDescription('User to kick')
                .setRequired(true))
            .addStringOption((option) => option
                .setName('reason')
                .setDescription('Reason for kick (sent to user')
                .setRequired(true))
            .addStringOption((option) => option
                .setName('log-reason')
                .setDescription('Reason for kick (not shared)'));
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const target = interaction.options.getUser('user');
        const userReason = interaction.options.getString('reason');
        const logReason = interaction.options.getString('log-reason') ?? ''; // since logReason is optional

        // if this command is ran inside a ticket belonging to the target this becomes a deny
        if (isTicket(interaction.channel)) {
            await denyVerification(
                DenyConsequence.kick,
                {
                    ticket: interaction.channel,
                    verifier: interaction.member,
                    userReason,
                    logReason,
                    applicant: target,
                },
                (message) => interaction.editReply({ content: message, ephemeral: true }),
            ).catch(async (error) => {
                if (error instanceof VerificationError) {
                    await interaction.editReply({ content: error.message, ephemeral: true });
                } else {
                    await interaction.editReply({
                        content: `Error: ${error.message}`,
                        ephemeral: true,
                    });
                    throw error;
                }
            });
            return;
        }

        // otherwise, kick user
        try {
            await kick(
                'Member was kicked by verifier',
                {
                    target,
                    verifier: interaction.member,
                    userReason,
                    logReason,
                    dmMessage: `You have been kicked from ${bold(interaction.guild.name)} for the following reason:\n${codeBlock(userReason)}`,
                },
            );

            await interaction.editReply({
                content: `Kicked ${target.tag} from the server.`,
                ephemeral: true,
            });
        } catch (error) {
            if (error instanceof VerificationError) {
                await interaction.editReply({ content: error.message, ephemeral: true });
            } else {
                await interaction.editReply({ content: `Error: ${error.message}`, ephemeral: true });
                throw error;
            }
        }
    }
}

export default Kick;
