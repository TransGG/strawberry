import { ButtonBuilder, ButtonStyle } from 'discord.js';

import mentionVerifiers from '../../../../../verification/managers/mentionVerifiers.js';
import InteractionHelper from '../../../../utils/InteractionHelper.js';
import TakesArguments from '../../../TakesArguments.js';
import Button from '../../Button.js';
import config from "../../../../../config/config.js";

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
        await InteractionHelper.deferUpdate(interaction);

        await mentionVerifiers(
            interaction.channel,
            interaction.member,
            interaction.client,
            type,
            // disable buttons on resolve
            async (components) => {
                await InteractionHelper.update(
                    interaction,
                    {
                        components,
                    },
                );

                // we don't use the built-in emoji formatter here because it makes it less apparent
                // an emoji is supposed to be there if emoji is not found
                return InteractionHelper.reply(
                    interaction,
                    `Verifiers have been pinged. Please be patient as they go through the queue ${config.guilds[interaction.guild.id].proxy.heartEmoji} (p.s. this also disables the kick timer, so don't worry if it takes us a while to get to you)!`,
                    true,
                );
            },
            (message) => InteractionHelper.reply(interaction, message, true),
        );
    }
}

export default MentionVerifiers;
