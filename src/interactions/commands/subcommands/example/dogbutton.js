import { setTimeout as wait } from 'node:timers/promises';
import {
    SlashCommandSubcommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import SubCommand from '../../Subcommand.js';

/**
 * Handler for dogbutton subcommand. Example for monolithically creating an example button, receiving button presses,
 * and handling the button press(es).
 */
class dogbutton extends SubCommand {
    /**
     * @param {string} name The name of this subcommand
     */
    constructor(name = 'dogbutton') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription('Creates a button and responds to it');
    }

    /**
     * Method to run when this subcommand is executed
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when the slash command was
     *     executed
     */
    async run(interaction) {
        // make button
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('​') // zero width space so emoji is centered
                    .setStyle(ButtonStyle.Primary)
                    // .setDisabled(true)
                    .setEmoji('1000617650419929120'),
            );

        // make filter for collector and make collector
        const filter = (i) => i.customId === 'primary' && i.user.id === '274206665241395202';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i) => {
            await i.deferUpdate();
            await wait(4000);
            await i.editReply({ content: 'A button was clicked!', components: [] }); // empty components removes buttons
        });

        collector.on('end', (collected) => console.log(`Collected ${collected.size} items`));

        // make message
        await interaction.reply({ content: 'Dogge', ephemeral: true, components: [row] });
    }
}

export default dogbutton;
