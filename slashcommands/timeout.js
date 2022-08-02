// timeout slash command handler

const Discord = require("discord.js")

// values for the choices of the timeout choices, in milliseconds
const durations = [
	{ name: "60 seconds", value: 60 * 1000 },
	{ name: "5 minutes", value: 5 * 60 * 1000 },
	{ name: "10 minutes", value: 10 * 60 * 1000 },
	{ name: "30 minutes", value: 30 * 60 * 1000 },
	{ name: "1 hour", value: 60 * 60 * 1000 },
	{ name: "1 day", value: 24 * 60 * 60 * 1000 },
	{ name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
]

const run = async (client, interaction) => {
    // fetch options
    let member = interaction.options.getMember('user')
    let duration = interaction.options.getNumber('duration')
    let reason = interaction.options.getString('reason') || 'No reason given'

    // verify member validity
    if (!member) {
        return interaction.reply('Invalid member')
    }

    // try to timeout user
    try {
        await member.timeout(duration, reason)
        return interaction.reply(`${member.user.tag} has been timed out for ${durations.find(d => duration === d.value)?.name} with a reason of ${reason} `)
    } catch (error) {
        if (error) {
            console.error(error)
            return interaction.reply(`Failed to timeout ${member.user.tag}`)
        }
    }
}

// define the parameters of the command
module.exports = {
    name: 'timeout',
    description: 'Timeout a member',
    perm: 'MODERATE_MEMBERS', // see permissions in discord api for a list of perms: https://discord.com/developers/docs/topics/permissions
    options: [
        { // who to time out
            name: 'user',
            description: 'The user to timeout',
            type: Discord.ApplicationCommandOptionType.User, // see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type for all types
            required: true
        },
        { // the duration of the timeout
            name: 'duration',
            description: 'The duration of the timeout',
            type: Discord.ApplicationCommandOptionType.Number,
            choices: durations,
            required: true
        },
        { // reason for timeout (optional)
            name: 'reason',
            description: 'Reason for punishment',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run
}