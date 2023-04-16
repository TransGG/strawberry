import { StringSelectMenuBuilder } from 'discord.js';
import SelectMenu from '../SelectMenu.js';

/**
 * Handler for example select menu. Example
 */
class Example extends SelectMenu {
    /**
     * @param {string} name The name to use to identify this select menu and to serve as its
     *     customId. Must be unique.
     */
    constructor(name = 'example') {
        super(name);
    }

    /**
     * @returns {StringSelectMenuBuilder} The data that describes the menu format to the Discord
     *     API.
     */
    getData() {
        return new StringSelectMenuBuilder()
            .setCustomId(this.name)
            .setPlaceholder('Placeholder Text')
            .addOptions([
                {
                    label: 'Label',
                    description: 'Description',
                    value: 'value',
                },
            ]);
    }

    /**
     * Method to run when this select menu is used
     * @param {SelectMenuInteraction} interaction The interaction that was emitted when this select
     *     menu was used
     */
    async run(interaction) {
        await interaction.reply({ content: `You selected ${interaction.values.join(', ')}!`, ephemeral: true });
    }
}

export default Example;
