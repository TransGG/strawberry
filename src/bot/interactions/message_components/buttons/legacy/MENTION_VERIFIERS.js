import {
    ButtonBuilder,
    ButtonStyle,
    Events,
} from 'discord.js';
import reemitInteraction from '../../../../utils/reemit.js';
import TakesArguments from '../../../TakesArguments.js';
import Button from '../../Button.js';

/**
 * Handler for MENTION_VERIFIERS button. Summons verifiers to the verification ticket.
 */
class MentionVerifiers extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'MENTION_VERIFIERS') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData(type) {
        console.error(`${this.name}: should really not be getting data of a legacy button!`);
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
     */
    async run(interaction) {
        reemitInteraction(
            Events.InteractionCreate,
            interaction,
            interaction.client.getButton('mentionVerifiers'),
        );
    }
}

export default MentionVerifiers;
