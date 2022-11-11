import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for say slash command. Sends a message with the given input
 */
class Say extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'say') {
        super(name);
    }

    /**
     * @returns {SlashCommandBuilder} The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sends a message with the given input')
            .addStringOption((option) => option.setName('message')
                .setDescription('The message to send')
                .setRequired(true))
            .addStringOption((option) => option.setName('replyto')
                .setDescription('How to reply to this interaction, if any')
                .setAutocomplete(true))
            .addBooleanOption((option) => option.setName('ephemeral')
                .setDescription('Whether or not the reply should be ephemeral'));
    }

    /**
     * Handler for autocompletion of an option
     * @param {AutocompleteInteraction} interaction The interaction to autocomplete
     */
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        // three options
        const choices = ['Interaction', 'None', 'Enter message id:'];

        // if the user has typed anything, either show only the message id input or everything but it
        if (focusedValue.length > 0) {
            const msgIdOption = choices.pop();
            if (/^\d+$/.test(focusedValue)) { // test if string contains only numbers
                await interaction.respond(
                    [{ name: msgIdOption, value: focusedValue }],
                );
            }
        }
        const filtered = choices.filter((choice) => choice.toLowerCase().startsWith(focusedValue.toLowerCase()));
        if (!interaction.responded) {
            await interaction.respond(
                filtered.map((choice) => ({ name: choice, value: choice })),
            );
        }
    }

    /**
     * Method to run when this slash command is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this slash command was
     *     executed
     */
    async run(interaction) {
        const message = interaction.options.getString('message').replace('\\n', '\n');
        const ephemeral = interaction.options.getBoolean('ephemeral');

        // if ephemeral is true, override the replyto choice with 'Interaction'
        const replyto = ephemeral ? 'Interaction' : interaction.options.getString('replyto');

        // send the message according to the parameters
        if (replyto === 'Interaction') {
            await interaction.reply({ content: message, ephemeral });
        } else if (!replyto || replyto === 'None') {
            await interaction.channel.send(message);
            await interaction.reply('Sent!');
        } else if (/^\d+$/.test(replyto)) { // replyto consists of only numbers, which we interpret as a message id
            try {
                const msgToReplyTo = await interaction.channel.messages.fetch(replyto);
                await msgToReplyTo.reply(message);
                await interaction.reply('Sent!');
            } catch {
                await interaction.reply({
                    content: `Message not found in this channel for id ${replyto}.`,
                    ephemeral: true,
                });
            }
        } else {
            interaction.reply({
                content: `Invalid input '${replyto}' for replyto. Should be one of the options or a message id.`,
                ephemeral: true,
            });
        }
    }
}

export default Say;
