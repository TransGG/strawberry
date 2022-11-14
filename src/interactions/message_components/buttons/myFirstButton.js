import { ButtonBuilder, ButtonStyle } from 'discord.js';
import Button from '../Button.js';

/**
 * Handler for myFirstButton button. Example for buttons
 */
class MyFirstButton extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'myFirstButton') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
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
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        await interaction.update({ content: 'and...' });
        await interaction.editReply({ content: 'Dong!', components: [] });
    }
}
export default MyFirstButton;
