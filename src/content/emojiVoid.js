import {
    ActionRowBuilder,
    EmbedBuilder,
} from 'discord.js';

const leaveEmojiVoidEmbed = new EmbedBuilder()
    .setColor(0x6F6DB8)
    .setTitle('Welcome to the Emoji Void')
    .setDescription('***You can avoid any mentions and member purges while being here.***');

function buildEmojiVoidComponents(client) {
    return [
        new ActionRowBuilder()
            .addComponents(
                client.getButton('removeEmojiVoid'),
            ),
    ];
}

const emojiVoidEmbeds = [
    leaveEmojiVoidEmbed,
];

export {
    emojiVoidEmbeds,
    buildEmojiVoidComponents,
};
