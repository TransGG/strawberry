import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import Modal from '../Modal.js';

/**
 * Handler for myFirstModal modal. Demonstration of modal handling.
 */
class MyFirstModal extends Modal {
    /**
     * @param {string} name The name of this modal
     */
    constructor(name = 'myFirstModal') {
        super(name);
    }

    /**
     * @returns {ModalBuilder} The data that describes the modal format to the Discord API
     */
    getData() {
        // Courtesy of https://discordjs.guide/interactions/modals.html
        const modal = new ModalBuilder()
            .setCustomId(this.name)
            .setTitle('My Modal');

        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('favoriteColorInput')
            .setLabel("What's your favorite color?")
            .setStyle(TextInputStyle.Short)
            .setMaxLength(1000)
            .setMinLength(5)
            .setPlaceholder('Enter some text!')
            .setValue('Default')
            .setRequired(true);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('hobbiesInput')
            .setLabel("What's some of your favorite hobbies?")
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        modal.addComponents(firstActionRow, secondActionRow);

        return modal;
    }

    /**
     * Method to run when this modal is submitted
     * @param {ModalSubmitInteraction} interaction The interaction that was emitted when this modal was submitted
     */
    async run(interaction) {
        const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
        const hobbies = interaction.fields.getTextInputValue('hobbiesInput');

        /*
         * A bit of interpretive jiggery-pokery: if the modal was shown from a ButtonInteraction or
         * SelectMenuInteraction, the interaction will provide update() and deferUpdate(). We can determine this by
         * checking if message exists.
         */
        if (interaction.message) {
            await interaction.update({ content: `${favoriteColor}\n${hobbies}` });
        } else {
            await interaction.reply({ content: `${favoriteColor}\n${hobbies}`, ephemeral: true });
        }

        console.log(interaction);
    }
}

export default MyFirstModal;
