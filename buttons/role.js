// handler to assign a role on button press

// const bot = require("..")

module.exports = {
    name: 'role',
    run: async (bot, interaction, parameters) => {
        // get the role id from the first parameter
        const roleId = parameters[0]

        // check that the interaction was ran in a guild
        if (!interaction.guild) {
            return interaction.reply({content: 'This command can only be used in a guild!', ephemeral: true})
        }

        // get the role from the guild role manager
        const role = await interaction.guild.roles.fetch(roleId)
        // check if the role exists
        if (!role) {
            return interaction.reply({content: 'Role not found', ephemeral: true})
        }

        // get the member as a GuildMember
        const member = await interaction.guild.members.fetch(interaction.member.id)

        // remove the role from the member if the member has the role and vice versa
        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role.id)
            return interaction.reply({content: `Removed the role ${role.name} from you!`, ephemeral: true})
        } else {
            await member.roles.add(role.id)
            return interaction.reply({content: `Added the role ${role.name} to you!`, ephemeral: true})
        }
    }
}