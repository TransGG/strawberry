import {
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import {
    verbose,
} from '../../../../../config/out.js';
import Button from '../../Button.js';
import config from '../../../../../config/config.js';

/**
 * Handler for emojiVoid button.
 */
class RemoveEmojiVoid extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'removeEmojiVoid') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Leave Emoji Void')
            .setStyle(ButtonStyle.Success);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        verbose(`Request to go to the emoji void from: ${interaction.user.tag} ${interaction.member.id}`);

        if (!config.roles.emojiVoid) {
            interaction.reply({
                content: 'Unable to remove the emoji void role. Please contact a moderator.',
                ephemeral: true,
            });
        } else if (interaction.member.roles.cache.has(config.roles.emojiVoid)) {
            interaction.member.roles.remove(config.roles.emojiVoid);
            interaction.reply({
                content: 'You have been removed from the emoji void. You can now continue verification.',
                ephemeral: true,
            });
        } else {
            interaction.reply({
                content: 'You are not in the emoji void. If you believe this is an error, please contact a moderator.',
                ephemeral: true,
            });
        }
    }
}

export default RemoveEmojiVoid;
