import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import SlashCommand from '../classes/SlashCommand.js'

/**
 * Handler for makeembed slash command. Makes an embed to demonstrate embed creation
 */
class MakeEmbed extends SlashCommand {
    /**
     * Constructor for MakeEmbed class and instantiates this.data
     * 
     * @param {Client} client The Discord Client that will handle this command
     * @param {string} name The name of this slash command
     */
    constructor(client, name) {
        super(client, name)

        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription('Makes an embed')
    }

    /**
     * Method to run when this slash command is executed
     * 
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
     */
    async run(interaction) {
        // courtesy of https://discordjs.guide/popular-topics/embeds.html
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true }
            )
            .addFields(
                { name: 'Inline field title', value: 'Some value here', inline: true })
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
    }
}

export default MakeEmbed