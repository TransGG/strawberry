import {
    ActionRowBuilder,
    bold,
    ButtonBuilder,
    ButtonStyle,
    channelMention,
    EmbedBuilder,
    italic,
    roleMention,
    userMention,
} from 'discord.js';
import config from '../../../../../config/config.js';
import Button from '../../Button.js';

/**
 * Handler for VERIFY_USER button. Verifies a user
 */
class VerifyUser extends Button {
    /**
     * @param {string} name The name to use to identify this button and to serve as its customId.
     * Must be unique.
     */
    constructor(name = 'VERIFY_USER') {
        super(name);
    }

    /**
     * @returns {ButtonBuilder} The data that describes the button format to the Discord API.
     */
    getData() {
        return new ButtonBuilder()
            .setCustomId(this.name)
            .setLabel('Verify User')
            .setStyle(ButtonStyle.Success);
    }

    /**
     * Method to run when this button is pressed
     * @param {ButtonInteraction} interaction The interaction that was emitted when this slash
     *     command was executed
     */
    async run(interaction) {
        const threadName = interaction.channel.name.split(' | ');
        if (threadName.length !== 2) {
            return;
        }
        const applicantId = threadName[1];

        // Check if the current member is a verifier
        if (!interaction.member.roles.cache.has(config.roles.verifier)) {
            await interaction.reply({
                content: 'You are not a verifier',
                ephemeral: true,
            });
            return;
        }

        // check to see if the message the button is attached to is a prompt on an older version
        if (interaction.message.components[0].components[0].data.custom_id === 'VERIFY_USER'
            && interaction.message.content) {
            await interaction.message.edit({
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            interaction.client.getButton('VERIFIER_ACTIONS'),
                            interaction.client.getButton('MENTION_VERIFIERS')
                                .addArgs(1)
                                .setDisabled(true),
                            interaction.client.getButton('MENTION_VERIFIERS')
                                .addArgs(2)
                                .setDisabled(true),
                        ),
                ],
            });

            await interaction.reply({
                content: 'This action was not performed as the embed buttons were on a older version. Please try again with the new buttons.',
                ephemeral: true,
            });
            return;
        }

        // get guild member
        const guildMember = await interaction.guild.members.fetch(applicantId);
        if (!guildMember) {
            await interaction.reply({
                content: 'Member is no longer apart of guild.',
                ephemeral: true,
            });
            return;
        }

        // get verified role to give to member
        const role = await interaction.guild.roles.fetch(config.roles.verified);

        // add the verified role to the user
        await guildMember.roles.add(role);

        await interaction.reply({
            content: `${userMention(applicantId)} has been verified`,
            allowedMentions: {
                parse: [],
            },
        });

        // archive the thread
        await interaction.channel.setArchived(true, 'Archived by verifier');

        const randomMessage = [
            'say hello to you new best friend {user}!',
            'everyone wake up {user} joined!',
            "don't get too surprised but... {user} is here!",
            'your wish came true! {user} was verified!',
        ];

        const randomImage = [
            'https://cdn.discordapp.com/attachments/960315252044603413/978873384425369700/Dutch.png',
            'https://cdn.discordapp.com/attachments/960315252044603413/978873384790261780/Esperanto.png',
            'https://cdn.discordapp.com/attachments/960315252044603413/978873385025175602/Filipino.png',
            'https://cdn.discordapp.com/attachments/960315252044603413/978873385264234507/French.png',
            'https://cdn.discordapp.com/attachments/960315252044603413/978873385553645608/German.png',
            'https://cdn.discordapp.com/attachments/960315252044603413/978873385872404571/Greek.png',
            'https://cdn.discordapp.com/attachments/960315252044603413/978873386107281418/Korean.png',
            'https://cdn.discordapp.com/attachments/960315252044603413/978873386354761779/Russian.png',
            // "https://cdn.discordapp.com/attachments/960315252044603413/978873386598023188/Spanish.png"
        ];

        const randomEmoji = [
            ':heart:',
            ':magic_wand:',
            ':people_hugging:',
            ':dolphin:',
            ':confetti_ball:',
            ':tada:',
            ':pushpin:',
            ':chart_with_upwards_trend:',
            ':sparkles:',
            ':golf:',
        ];

        const randomFact = [
            'Some potatoes are poisonous.',
            "Most dirt isn't edible.",
            'Walls are often made with bricks, but clay can also be used.',
            'Mixing apple juice and Toothpaste would most likely taste bad.',
            'Soup cans are often repurposed to create homes for small animals such as rats.',
            'Some humans have been able to learn the language spoken by orange species of fish.',
            "Pluto's surface contains plutonium, which tastes like fruit if consumed in the vacuum of space.",
            'Pasta is not a good way to glue things.',
            'Nasa is developing a new form of spacesuit which aims to prevent you from entering the playground after 9pm.',
            'If you mess up drinking water, you may suffocate.',
            'All animals can fly, but some only once.',
            'Drinking water at 10pm while saying "Your cute" to all your best friends can cause you to become cute yourself.',
            'Penelopie with an "i" is a cute name.',
            'Using your shoe as a flower pot could actually work.',
            "Using your shoes as a flower pot means you can't use them to walk anymore.",
            'Waking up in the morning is the best way to start your day.',
            'We love you for who you are. :max_heart:',
            'Sometimes I sleep outside.',
            'You always dream about yourself on Tuesdays.',
            'Zebras have stripes to make tigers hurt themselves in their confusion.',
            'If beans contain soy, then why are you made of hummus?',
            'Monday is often considered the first day of the week.',
            'We are made of Mayonnaise if you dig deep enough.',
            "November is the month you were born in, even if you don't realize it.",
            'If you weigh 49.5kg and eat 500g of m&ms, you are 1% m&m.',
            'Green is not a real color, instead it is made up of combining orange and greenish blue.',
            'In each and every marriage lives a gerbil.',
            'My favorite fruit is strawberries.',
            'Your pets have business meetings while you sleep.',
            'Clouds cannot be walked on in real life.',
            'Tetris is a game about finding the good in humanity.',
            "\" Don't believe the source of every quote\" - Albert Einstein",
            'Bats can read your mind and comfort you in times of need.',
            'Weeds grow in your backyard even if you ask them not to.',
            'Your sleeping right now, wake up.',
            'If the Matrix can be created in real life, you are probably in one right now.',
            "Zebras are only black and white because they cannot see in color and therefore couldn't make another decision.",
            'Some Pans cannot be used to cook.',
            "If you golf with your hands, you can't bake cakes.",
            'Being left handed is something to be proud of.',
            'Having a guide dog for being colorblind is not a good idea.',
            'Math is just a distraction to make you not notice the rats in your back yard.',
            'Cats cannot tell you their favorite color as they cannot speak.',
            'You forget how to walk if you try and think about how you walk while walking.',
            'Submitting a pull request is the best way to confess your love to your significant other.',
            "Sometimes I want to pick flowers by the sand, but they won't let me.",
            "I can't hear you, but I also don't have ears.",
            'Opening the pickle jar can cause you to eat pickles inadvertently.',
            'V8 Juice is made up of green things.',
            'Vegetables are kinda icky.',
            'I really wish you would stop texting me at 3am.',
            "I'm hungry... Are you?",
            'Stop, Drop, and Roll if you ever feel the need to stretch your legs.',
            'Floor tiles can not solve all your problems.',
            'Cute people will make you smile.',
            'The popular song in Phineas and Ferb, squirrel in my pants: is about someone with squirrels in their pants.',
            "The length of Great Britain's coastline remains a mystery.",
            'Giving a door as a birthday gift may not give you the expected response.',
            'Fire is often fairly warm.',
            'TransPlace placed trans on place.',
            "These quotes aren't all true.",
            'I am never gonna give you up.',
            'Mathematicians warn we may run out of natural numbers by the end of the century.',
            'Magnets become less attractive and more repulsive after having children.',
            'Earth’s Magnetic Field can be restarted with nuclear bombs.',
            'Magnets become stronger in the cold because they shiver.',
            'Most potatoes are farmed underground.',
            'Yellow golf balls have been found to be made of golf balls.',
            'Some plants and trees grow upside down.',
            'Money is actually just paper with emotional value.',
            'Saté sauce is often made from simple peanut butter in home recipes.',
            'The UK has a large population so sometimes we have to live in the UK.',
            'The average person walks the equivalent of a mile in their lifetime.',
            'Magnetism is a phenomenon that occurs when two or more atoms are attracted to each other.',
            'Sometimes we see things from the past, sometimes things from the future.',
            'Often yellow things are made of yellow things.',
        ];

        // send welcome message
        await interaction.client.channels.cache.get(config.channels.welcome).send({
            content: `${roleMention(config.roles.greeter)}, ${randomMessage[Math.floor(Math.random() * randomMessage.length)].replace('{user}', userMention(applicantId))}`,
            embeds: [
                new EmbedBuilder()
                    .setColor(0xF5F5F5)
                    .setTitle(`Welcome to TransPlace, a place for trans people. ${randomEmoji[Math.floor(Math.random() * randomEmoji.length)]}`)
                    .setDescription(
                        `${bold('Welcome {user}! We\'re glad to finally meet you!')}\n${italic('Why don\'t you check out some of the channels below to get started?')}\n\n${channelMention(config.channels.rules)} - Read the Rules!\n${channelMention(config.channels.roles)} - Assign some Roles!\n${channelMention(config.channels.introduce)} - Introduce Yourself!`
                            .replace('{user}', userMention(applicantId)),
                    )
                    .setImage(randomImage[Math.floor(Math.random() * randomImage.length)])
                    .setFooter({
                        text: `Did you know? : ${randomFact[Math.floor(Math.random() * randomFact.length)]}`,
                    }),
            ],
        });

        // send log message
        await interaction.client.channels.cache.get(config.channels.verifyLogs).send({
            content: `${userMention(interaction.user.id)} verified ${userMention(applicantId)}.`,
            allowedMentions: {
                parse: [],
            },
        });
    }
}
export default VerifyUser;
