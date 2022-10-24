import { SelectMenuBuilder } from 'discord.js';
import SelectMenu from '../SelectMenu.js';

/**
 * Handler for myFirstSelectMenu select menu. Example for select menus
 */
class MyFirstSelectMenu extends SelectMenu {
    /**
     * @param {string} name The name to use to identify this select menu and to serve as its customId. Must be unique.
     */
    constructor(name = 'myFirstSelectMenu') {
        super(name);
    }

    /**
     * @returns {SelectMenuBuilder} The data that describes the select menu format to the Discord API.
     */
    getData() {
        return new SelectMenuBuilder()
            .setCustomId(this.name)
            .setPlaceholder('Nothing selected')
            .setMinValues(2)
            .setMaxValues(3)
            .addOptions([
                {
                    label: 'Option 1',
                    description: 'Description 1',
                    value: 'first_option',
                },
                {
                    label: 'Option two',
                    description: 'Description two',
                    value: 'second_option',
                },
                {
                    label: 'Option the third',
                    description: 'Description the third',
                    value: 'third_option',
                },
            ]);
    }

    /**
     * Method to run when this select menu is used
     * @param {SelectMenuInteraction} interaction The interaction that was emitted when this select menu was used
     */
    async run(interaction) {
        await interaction.update({ content: `You selected ${interaction.values.join(', ')}!` });
    }
}

export default MyFirstSelectMenu;
