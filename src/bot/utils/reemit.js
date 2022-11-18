import { verbose } from '../../config/out.js';
import TakesArguments from '../interactions/TakesArguments.js';

/**
 * Re-emits an interaction with a new custom id
 * @param {string} event The name of the event
 * @param {import('discord.js').Interaction} interaction The interaction to re-emit
 * @param {TakesArguments} newCustomIdSource The new value to assign to
 *     interaction.customId
 */
function reemitInteraction(event, interaction, newCustomIdSource) {
    const [, ...args] = TakesArguments.tokenize(interaction.customId);
    const newCustomId = newCustomIdSource.addArgs(...args).data.custom_id;

    verbose(`re-emitting ${interaction.customId} as ${newCustomId}`);

    // mutating interaction because interaction is unlikely to be used elsewhere and other deep copy
    // methods are insufficient
    // eslint-disable-next-line no-param-reassign
    interaction.customId = newCustomId;
    interaction.client.emit(event, interaction);
}

export default reemitInteraction;
