const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

// send a message that contains a button that will allow role assignment/unassignment
// used to test out button functionality

module.exports = {
    name: 'roleselector',
    category: 'test',
    devOnly: true,
    run: async ({client, message, args}) => {
        message.channel.send({
            embeds: [
                new EmbedBuilder().setTitle('Select Role').setDescription('Select roles from the buttons below').setColor('BLUE')
            ],
            components: [ // buttons are called components in discord.js
                // components are divided up into individual rows
                new ActionRowBuilder().addComponents([ // create a row
                    new ButtonBuilder().setCustomId('role-1016584910590459904').setStyle('Primary').setLabel('5') // see interactionCreate.js for our convention of customId's
                ])
            ]
        })
    }
}