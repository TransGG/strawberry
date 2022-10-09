import { SlashCommandBuilder } from 'discord.js';
import Interaction from './Interaction.js';

/**
 * Parent class for commands. Subclasses should have a run() function, which is called when
 * the command is ran
 */
class SlashCommand extends Interaction {
    /**
     * Default implementation of data
     */
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('No description given!');
    }
}

export default SlashCommand;
