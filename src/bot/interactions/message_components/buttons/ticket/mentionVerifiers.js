import {
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import mentionVerifiers from '../../../../../verification/managers/mentionVerifiers.js';
import TakesArguments from '../../../TakesArguments.js';
import Button from '../../Button.js';

/**
 * Handler for mentionVerifiers button. Summons verifiers to the verification ticket.
 */
class MentionVerifiers extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'mentionVerifiers') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData(type) {
        const stringify = String(type);
        if (stringify === '1') {
            return new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel('I Need Help Please.')
                .setStyle(ButtonStyle.Secondary);
        }
        if (stringify === '2') {
            return new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel('Finished Answering!')
                .setStyle(ButtonStyle.Success);
        }
        throw new Error(`Invalid argument for button ${this.name}: ${type}`);
    }

    /**
     * Creates a version of the data with arguments added in.
     * @param {string|number} type Arguments to add on to the data
     * @returns {ButtonBuilder} The data with the arguments added in
     */
    addArgs(type) {
        return TakesArguments.addArgs(this.getData(type), type);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     * @param {string} type The type of mention verifiers button. 1 or 2.
     */
    async run(interaction, type) {
        await mentionVerifiers(
            // disable buttons on resolve
            (components) => interaction.update({
                components,
            }),
            (message) => interaction.reply({
                content: message,
                ephemeral: true,
            }),
            interaction.channel,
            interaction.member,
            interaction.client,
            type,
        );
    }
}

export default MentionVerifiers;
