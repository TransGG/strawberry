import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../classes/SlashCommand.js';

/**
 * Handler for coolping slash command. Simple responses to a command in the same vein as ping, but demonstrates
 * different ways to respond to an interaction
 */
class CoolPing extends SlashCommand {
    /**
     * Constructor for CoolPing class and instantiates this.data
     * @param {Client} client The Discord Client that will handle this command
     * @param {string} name The name of this slash command
     */
    constructor(client, name) {
        super(client, name);

        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription('Demonstrates different ways to respond to a message')
            .addBooleanOption((option) => option.setName('ephemeral')
                .setDescription('Whether or not to send the response(s) as ephemeral')
                .setRequired(true))
            .addIntegerOption((option) => option.setName('defer-time')
                .setDescription('Defers the response by this many milliseconds'))
            .addStringOption((option) => option.setName('edit-text')
                .setDescription('Edit the message to say this'))
            .addStringOption((option) => option.setName('follow-up-text')
                .setDescription('Text to send in a follow up message')
                .addChoices(
                    { name: 'Choice 1', value: 'You chose choice 1' },
                    { name: 'Choice 2', value: 'You chose choice 2' },
                    { name: 'Choice the third', value: 'You chose choice the third' },
                ));
    }

    /**
     * Method to run when this slash command is executed
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
     */
    async run(interaction) {
        // get options (options can only be retrieved once)
        const ephemeralChoice = interaction.options.getBoolean('ephemeral');
        const deferTime = interaction.options.getInteger('defer-time');
        const editText = interaction.options.getString('edit-text');
        const followUpText = interaction.options.getString('follow-up-text');

        // defer causes the "[bot] is thinking" message to appear and expands the window for a reply from 3 seconds to
        // 15 minutes
        if (deferTime) {
            await interaction.deferReply({ ephemeral: ephemeralChoice });

            // eslint-disable-next-line no-promise-executor-return
            await new Promise((r) => setTimeout(r, deferTime));
            await interaction.editReply({ content: 'Pong!', ephemeral: ephemeralChoice });
        } else {
            await interaction.reply({ content: 'Pong!', ephemeral: ephemeralChoice });
        }

        // edits the reply's pre-existing contents with new contents, in this case text
        if (editText) {
            // eslint-disable-next-line no-promise-executor-return
            await new Promise((r) => setTimeout(r, 1000));
            await interaction.editReply(editText);
        }

        // sends a follow up message, which is in this case composed of text
        if (followUpText) {
            await interaction.followUp({ content: followUpText, ephemeral: ephemeralChoice });
        }
    }
}

export default CoolPing;
