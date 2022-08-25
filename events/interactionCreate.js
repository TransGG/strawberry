// event handler for interactionCreate event
// interactionCreate happens when when a user uses an application command or a message component
// only handles slash commands currently

module.exports = {
	name: "interactionCreate",
	run: async (bot, interaction) => {
        const { client } = bot
        // permission and validity checking
        // the three types of interaction are commands, dropdown menus, and buttons
        // we want to only deal with commands, so we ignore all others
        if (!interaction.isChatInputCommand()) {
            return
        }
        // slash commands should only be used in guilds
        if (!interaction.inGuild()) {
            return interaction.reply('This command can only be used in a guild')
        }

        // get slash command based on the commandName from the interaction
        const slashcmd = client.slashcommands.get(interaction.commandName)

        // slash command not found
        if (!slashcmd) {
            return interaction.reply('Invalid slash command')
        }

        // permission check for member
        if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm)) {
            return interaction.reply('You do not have permission for this command')
        }

        // run the slash command
        slashcmd.run(client, interaction)
	},
}