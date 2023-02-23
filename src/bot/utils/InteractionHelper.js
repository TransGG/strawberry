class InteractionHelper {
    /**
     * Defers the response with either defer options or the ephemerality
     * @param {InteractionResponses} interaction The interaction to defer
     * @param {boolean|InteractionDeferReplyOptions} [options] The ephemerality if boolean, the
     *     defer options if InteractionDeferReplyOptions or defers with no parameter if none was
     *     passed
     */
    static async deferReply(interaction, options) {
        if (options) {
            const deferOptions = typeof options === 'boolean'
                ? { ephemeral: true }
                : options;

            return interaction.deferReply(deferOptions);
        }
        return interaction.deferReply();
    }

    /**
     * Defers the update with either defer options or the ephemerality
     * @param {InteractionResponses} interaction The interaction to defer
     * @param {boolean|InteractionDeferReplyOptions} [options] The ephemerality if boolean, the
     *     defer options if InteractionDeferReplyOptions or defers with no parameter if none was
     *     passed
     */
    static async deferUpdate(interaction, options) {
        if (options) {
            const deferOptions = typeof options === 'boolean'
                ? { ephemeral: true }
                : options;

            return interaction.deferUpdate(deferOptions);
        }
        return interaction.deferUpdate();
    }

    /**
     * Sends the proper form of reply to an interaction whether the interaction is deferred or not.
     * @param {InteractionResponses} interaction The interaction to reply to
     * @param {string|InteractionReplyOptions} options The options for the reply
     * @param {boolean} [ephemeral=false] Whether to make the reply ephemeral. Overrides options if
     *     options has ephemeral set
     * @returns {Promise<Message|InteractionResponse>}
    */
    static async reply(interaction, options, ephemeral = false) {
        // coerce options to InteractionReplyOptions
        let sendOptions;
        // TODO: add embed and embed[] handling
        if (typeof options === 'string') {
            sendOptions = { content: options, ephemeral };
        } else {
            sendOptions = { ...options, ephemeral };
        }

        if (interaction.deferred || interaction.replied) {
            return interaction.followUp(sendOptions);
        }
        return interaction.reply(sendOptions);
    }

    /**
     * Sends the proper form of reply to an interaction whether the interaction is deferred or not.
     * @param {InteractionResponses} interaction The interaction to reply to
     * @param {string|InteractionReplyOptions} options The options for the reply
     * @param {boolean} [ephemeral=false] Whether to make the reply ephemeral. Overrides options if
     *     options has ephemeral set
     * @returns {Promise<Message|InteractionResponse>}
    */
    static async update(interaction, options, ephemeral = false) {
        // coerce options to InteractionReplyOptions
        let sendOptions;
        // TODO: add embed and embed[] handling
        if (typeof options === 'string') {
            sendOptions = { content: options, ephemeral };
        } else {
            sendOptions = { ...options, ephemeral };
        }

        if (interaction.deferred || interaction.replied) {
            return interaction.editReply(sendOptions);
        }
        return interaction.update(sendOptions);
    }
}

export default InteractionHelper;
