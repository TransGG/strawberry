// ban slash command handler

const Discord = require("discord.js")

const run = async (client, interaction) => {
    // fetch options
    let member = interaction.options.getMember('user')
    let reason = interaction.options.getString('reason') || 'No reason given'

    // verify member validity
    if (!member) {
        return interaction.reply('Invalid member')
    }

    // try to ban user
    try {
        await interaction.guild.bans.create(member, {
            reason
        })
        return interaction.reply(`${member.user.tag} has been banned for ${reason} `)
    } catch (error) {
        if (error) {
            console.error(error)
            return interaction.reply(`Failed to ban ${member.user.tag}`)
        }
    }
}

// define the parameters of the command
module.exports = {
    name: 'ban',
    description: 'ban a member',
    perm: 'BAN_MEMBERS', // see permissions in discord api for a list of perms: https://discord.com/developers/docs/topics/permissions
    options: [
        { // who to ban
            name: 'user',
            description: 'The user to ban',
            type: Discord.ApplicationCommandOptionType.User, // see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type for all types
            required: true
        },
        { // reason for ban (optional)
            name: 'reason',
            description: 'Reason for punishment',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run
}