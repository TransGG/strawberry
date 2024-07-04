import { Events } from 'discord.js';
import config from '../../config/config.js';
import Event from '../Event.js';

const userMap = new Map();

/**
 * Handler for messageCreate event
 */
class MessageCreate extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.MessageCreate) {
        super(client, name);
    }

    /**
     * Looks up the interaction from the interaction's client and runs it.
     * @param {Message} message The interaction whose creation triggered this event
     */
    async run(message) {
        if (
            message.author.bot
            || message.channel.type !== 12
            || !message.channel.parent
            || message.channel.parent.id !== config.guilds[message.guild.id].channels.lobby
        ) {
            return;
        }

        if (message.member.roles.cache.has(
            config.guilds[message.guild.id].roles.verified,
        )) { return; }
        userMap.set(message.author.id, message.id);

        setTimeout(async () => {
            if (userMap.get(message.author.id) === message.id) {
                userMap.delete(message.author.id);

                const thread = await message.channel.parent.threads.fetch(message.channel);
                if (thread && !thread.archived) {
                    const messages = await message.channel.messages.fetch({ limit: 50 });

                    // Check if there is a reminder message
                    if (messages.some((m) => m.webhookId && m.content.includes('[Reminder]'))) {
                        return;
                    }

                    const components = messages.filter((m) => m.author.id === config.clientId
                        && m.components.length > 0);

                    if (components.size > 0
                        && !components
                            .every((m) => m.components[0].components
                                .some((c) => c.data.disabled === true))) {
                        const webhooks = await message.channel.parent.fetchWebhooks();

                        if (!webhooks.size) {
                            await message.channel.parent.createWebhook({
                                name: 'Verification Kyle Proxy',
                            });
                        }

                        const webhook = (await message.channel.parent.fetchWebhooks()).first();

                        await webhook.send({
                            content: `\`[Reminder]\`\n${message.author} Please make sure to click the \`"Finished Answering!"\` or \`"I Need Help Please."\` buttons at the top of the channel after you've finished answering to complete the verification process. ^^`,
                            username: 'Kyle ♡ [Any Pronouns]',
                            avatarURL: 'https://i.imgur.com/fOJFzGz.png',
                            threadId: message.channel.id,
                        });
                    }
                }
            }
        }, 900000);
    }
}

export default MessageCreate;
