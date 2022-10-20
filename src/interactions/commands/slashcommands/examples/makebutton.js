import { setTimeout as wait } from 'node:timers/promises';
import {
    SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
} from 'discord.js';
import SlashCommand from '../../SlashCommand.js';

/**
 * Handler for Button slash command. Example for monolithically creating an example button, receiving button presses,
 * and handling the button press(es).
 */
class MakeButton extends SlashCommand {
    /**
     * @param {string} name The name of this slash command
     */
    constructor(name = 'makebutton') {
        super(name);
    }

    /**
     * The data that describes the command format to the Discord API
     */
    getData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Creates a button and responds to it');
    }

    /**
     * Method to run when this slash command is executed
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
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

export default MakeButton;
