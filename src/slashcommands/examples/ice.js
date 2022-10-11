import { SlashCommandBuilder } from 'discord.js';
import SlashCommand from '../../classes/SlashCommand.js';

/**
 * Handler for ice slash command. A demonstration of subcommands and subcommand groups all within one file.
 * @see stop.js for a demonstration of how subcommand[ group]s are handled with separate files within this project.
 */
class Ice extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'ice') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Never shown')
            .addSubcommand((subcommand) => subcommand
                .setName('cold')
                .setDescription('Hey ya')
                .addStringOption((option) => option
                    .setName('answer')
                    .setDescription('What\'s cooler than being cool?')))
            .addSubcommandGroup((group) => group
                .setName('ice')
                .setDescription('Never shown')
                .addSubcommand((subcommand) => subcommand
                    .setName('baby')
                    .setDescription('Ice Ice Baby')
                    .addStringOption((option) => option
                        .setName('flavor')
                        .setDescription('The flavor of your ice'))))
            .addSubcommandGroup((group) => group
                .setName('cream')
                .setDescription('Never shown')
                .addSubcommand((subcommand) => subcommand
                    .setName('sandwich')
                    .setDescription('ice cream sandwich')));
    }

    /**
     * Method to run when this slash command is executed
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
     */
    async run(interaction) {
        let message = '';
        const groupName = interaction.options.getSubcommandGroup();
        if (groupName) {
            const subcommandName = interaction.options.getSubcommand();
            if (groupName === 'ice' && subcommandName === 'baby') {
                const flavor = interaction.options.getString('flavor');
                message += `Your ice is ${flavor} ice`;
            } else if (groupName === 'cream' && subcommandName === 'sandwich') {
                message += 'You got an ice cream sandwich!';
            }
        } else { // no subcommand group
            const subcommandName = interaction.options.getSubcommand();
            if (subcommandName === 'cold') {
                const answer = interaction.options.getString('answer');
                message += `${answer} is cooler than cool`;
            }
        }

        await interaction.reply({ content: message, ephemeral: true });
    }
}

export default Ice;
