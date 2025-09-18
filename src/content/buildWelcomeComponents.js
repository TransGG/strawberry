import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    messageLink,
} from 'discord.js';
import config from '../config/config.js';

function buildWelcomeComponents(client, magicMessage) {
    const extra = [
        client.getButton('startVerification'),
    ];

    if (config.guilds[magicMessage.guild.id].roles.emojiVoid) {
        extra.push(client.getButton('addEmojiVoid'));
    }

    return [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(
                        messageLink(
                            config.guilds[magicMessage.guild.id].channels.lobby,
                            magicMessage.id,
                            magicMessage.guild.id,
                        ),
                    )
                    .setLabel('Scroll To Rules!')
                    .setStyle(ButtonStyle.Link),
                ...extra,
            ),
    ];
}

export default buildWelcomeComponents;
