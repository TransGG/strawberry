// event handler for interactionCreate event
// interactionCreate happens when when a user uses an application command or a message component
// only handles slash commands and buttons currently

module.exports = {
	name: "interactionCreate",
	run: async (bot, interaction) => {
        const { client } = bot
        // check what kind of interaction it is to determine which handler function to call
        if (interaction.isChatInputCommand()) { // slash commands
            handleSlashCommand(bot, interaction)
        } else if (interaction.isButton()) { // buttons
            handleButton(bot, interaction)
        }
	},
}

const handleButton = (bot, interaction) => {
    const {client} = bot

    // our convention for the customId is to be in the format: name-param1-param2-...
    // so get the name and params from the customId
    const [name, ...params] = interaction.customId.split('-')

    // get the button and run it
    const button = client.buttons.get(name)
    button.run(client, interaction, params)
}

const handleSlashCommand = (bot, interaction) => {
    const {client} = bot

    // validity and permission checking

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
}