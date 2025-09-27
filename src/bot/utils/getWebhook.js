import config from '../../config/config.js';

/**
 * Utility function to grab the proxy webhook from a channel
 * or create a new one if needed
 * @param {TextChannel} channel
 */
export default async function getWebhook(channel) {
    const webhooks = await channel.fetchWebhooks();

    const webhook = webhooks.find((w) => w.applicationId === channel.client.user.id);

    if (webhook) {
        return webhook;
    }

    return channel.createWebhook({ name: config.guilds[channel.guild.id].proxy.name });
}
