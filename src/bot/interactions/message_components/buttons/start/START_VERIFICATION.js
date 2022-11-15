import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    channelLink,
    codeBlock,
    EmbedBuilder,
    time,
    TimestampStyles,
    userMention,
} from 'discord.js';
import config from '../../../../../config/config.js';
import Button from '../../Button.js';

/**
 * Handler for START_VERIFICATION button. Puts a user into the verification process
 */
class StartVerification extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     *     Must be unique.
     */
    constructor(name = 'START_VERIFICATION') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Start Verification')
            .setStyle(ButtonStyle.Success);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        // Check if the current member is a verifier
        if (interaction.member.roles.cache.has(config.roles.verified)) {
            await interaction.reply({
                content: "You've already been verified silly",
                ephemeral: true,
            });
            return;
        }

        if (!interaction.channel) {
            return;
        }

        const { threads } = interaction.channel;

        // find existing threads
        const existingThread = threads.cache.find((thread) => {
            const splitUp = thread.name.split(' | ');
            return splitUp.length === 2 && splitUp[1] === interaction.user.id;
        });

        // if existing thread was found, prepare it then send a link to the user
        if (existingThread) {
            if (existingThread.archived) {
                await existingThread.setArchived(false, 'Unarchive by user');
                await existingThread.send({
                    content: `${userMention(interaction.user.id)} Your thread has been reopened, please make sure the above questions are filled out correctly then hit the \`Finished Answering!\` button below.`,
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                interaction.client.getButton('VERIFIER_ACTIONS'),
                                interaction.client.getButton('MENTION_VERIFIERS').addArgs(1),
                                interaction.client.getButton('MENTION_VERIFIERS').addArgs(2),
                            ),
                    ],
                });
                await interaction.reply({
                    content: 'You already have a archived thread open, this thread has been re-opened.',
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setURL(channelLink(existingThread.id, config.guild))
                                    .setLabel('View Thread')
                                    .setStyle(ButtonStyle.Link),
                            ),
                    ],
                    ephemeral: true,
                });
                return;
            }

            // TODO: this doesn't reenable the buttons
            await existingThread.send({
                content: userMention(interaction.user.id),
            }).then((msg) => msg.delete());

            await interaction.reply({
                content: 'You already have a thread open',
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setURL(channelLink(existingThread.id, config.guild))
                                .setLabel('View Thread')
                                .setStyle(ButtonStyle.Link),
                        ),
                ],
                ephemeral: true,
            });
            return;
        }

        // create new thread
        const newThread = await threads.create({
            invitable: false,
            name: `${interaction.user.tag} | ${interaction.user.id}`,
            autoArchiveDuration: config.verifyTicketAutoArchiveDuration,
            reason: 'Thread for verifying a user',
            type: config.privateThread,
        });

        // send prompt
        newThread.send({
            content: userMention(interaction.user.id),
            embeds: [{
                title: `Verification Ticket for ${interaction.user.tag}`,
                description: `Hi! Thank you for your patience with the verification process. As a part of the verification process, we ask that you answer the following questions. Do note that there are no right or wrong to answers these questions, but please try and give thorough / detailed responses. 
    
***Please keep in mind that 1-5 word / simple answers will oftentimes require more questions to have you verified, please try and give thoughtful / detailed responses to be verified quicker, no need to stress however if you cannot think of anything else to put, on behalf of our verification team thank you.*** :heart:

\`\`\`markdown
1. Do you agree to the server rules and to respect the Discord Community Guidelines & Discord ToS?

2. Do you identify as transgender; and/or any other part of the LGBTQ+ community? (Please be specific in your answer)

3. Do you have any friends who are already a part of our Discord? (If yes, please send their username)

4. What’s your main goal / motivation in joining the TransPlace Discord?

5. If you could change one thing about the dynamic of the LGBTQ+ community, what would it be? 

6. What is gatekeeping in relation to the trans community?

# If you have any social media that contains relevant post history related to the LGBTQ+ community, please link it to your discord account or send the account name or URL. 

*(We may use this to help fast track your verification, but linking/sharing any accounts is not required)\`\`\`
***If you need any help please click the "I Need Help Please." button and our verifiers will be added to your thread to help you.\nAfter you have answered all of the questions, please click the "Finished Answering!" button below which will add our verifier staff to your thread.***`,
                footer: {
                    text: 'After answering these questions, a member of the Verification Team may reach out if the answers to the above questions are incomplete or too vague. Thank you again for your patience and we can’t wait for you to join the TransPlace Discord.',
                },
            }],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        interaction.client.getButton('VERIFIER_ACTIONS'),
                        interaction.client.getButton('MENTION_VERIFIERS').addArgs(1),
                        interaction.client.getButton('MENTION_VERIFIERS').addArgs(2),
                    ),
            ],
        });

        // give user link to thread
        const newThreadURL = channelLink(newThread.id, config.guild);

        await interaction.reply({
            content: 'Created a ticket for you to verify your account',
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setURL(newThreadURL)
                            .setLabel('View Thread')
                            .setStyle(ButtonStyle.Link),
                    ),
            ],
            ephemeral: true,
        });

        // Add a log for the newly created thread TODO: refactor date calculation
        const oneDay = 1000 * 60 * 60 * 24;
        const oneHour = 1000 * 60 * 60;
        const now = Date.now();
        const diffInTimeCreated = now - interaction.user.createdAt;
        const diffInTimeJoined = now - interaction.member.joinedTimestamp;

        const logEmbed = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.avatarURL(),
            })
            .setDescription(`A new verification ticket has been created for ${interaction.user.tag}`)
            .setTimestamp()
            .setFooter({
                text: interaction.client.user.tag,
                iconURL: interaction.client.user.avatarURL(),
            })
            .addFields([{
                name: 'User Information',
                value: `${interaction.user.tag} (${interaction.user.id}) ${userMention(interaction.user.id)}`,
            },
            {
                name: 'Joined At',
                value: `${time(Math.round(interaction.member.joinedTimestamp / 1000), TimestampStyles.LongDateTime)}(${Math.floor(diffInTimeJoined / oneDay)} days, ${Math.floor(diffInTimeJoined / oneHour)} hours ago)`,
            },
            {
                name: 'Created At',
                value: `${time(Math.round(new Date(interaction.user.createdAt).getTime() / 1000), TimestampStyles.LongDateTime)} (${Math.floor(diffInTimeCreated / oneDay)} days, ${Math.floor(diffInTimeCreated / oneHour)} hours old)`,
            },
            {
                name: 'ID\'s',
                value: codeBlock('ini', `User = ${interaction.user.id}\nThread = ${newThread.id}`),
            },
            ]);

        const logMessage = await interaction.client.channels.cache.get(config.channels.verifyLogs)
            .send({
                embeds: [logEmbed],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setURL(newThreadURL)
                                .setLabel('View Thread')
                                .setStyle(ButtonStyle.Link),
                        ),
                ],
            });

        logMessage.startThread({
            name: `${interaction.user.tag} Private Verifier Discussion Thread`,
            autoArchiveDuration: config.verifyTicketAutoArchiveDuration,
            reason: 'Thread for verifier talks when verifying a user',
        });
    }
}

export default StartVerification;
