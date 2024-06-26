import { SlashCommandBuilder } from 'discord.js';
import { isTicket } from '../../../../../verification/controllers/ticket.js';
import { closeTicket, CloseReason } from '../../../../../verification/managers/closeTicket.js';
import VerificationError from '../../../../../verification/verificationError.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for close slash command. Closes a verification ticket
 */
class Close extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'close') {
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
            .setDescription('Closes a verification ticket');
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        if (isTicket(interaction.channel)) {
            await interaction.reply({ content: 'Closing ticket...', ephemeral: true });
            await closeTicket(interaction.channel, CloseReason.archive)
                .catch(async (error) => {
                    if (error instanceof VerificationError) {
                        await interaction.reply({ content: error.message, ephemeral: true });
                    } else {
                        await interaction.reply({ content: `Error: ${error.message}`, ephemeral: true });
                        throw error;
                    }
                });
        } else {
            await interaction.reply({
                content: 'You are not in a verification ticket',
                ephemeral: true,
            });
        }
    }
}

export default Close;
