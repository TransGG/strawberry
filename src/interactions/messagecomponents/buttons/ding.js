import { ButtonBuilder, ButtonStyle } from 'discord.js';
import Button from '../Button.js';

class Ding extends Button {
    /**
     * @param {string} name The naem to use to identify this button and to serve as its customId. Must be unique.
     */
    constructor(name = 'ding') {
        super(name);
    }

    /**
     * The data that describes the button format to the Discord API. Dictates button appeareance in the Discord client.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Ding!')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('1000617650419929120');
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash command was executed
     */
    async run(interaction) {
        await interaction.update({ content: 'and...' });
        await interaction.editReply({ content: 'Dong!', components: [] });
    }
}
export default Ding;
