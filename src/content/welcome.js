import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    messageLink,
} from 'discord.js';
import config from '../config/config.js';

// TODO: format all the discord links create components
// TODO: pull this out to a handler
const rulesImgEmbed = new EmbedBuilder()
    .setColor(0x6F6DB8)
    .setImage('https://i.imgur.com/gzTtYiQ.png');

const rulesEmbed = new EmbedBuilder()
    .setColor(0x6F6DB8)
    .setTitle('Rules')
    .setDescription('1. **Keep on-topic in all channels.** We understand conversations naturally drift; however, if they do not self-correct after a while, a mod may step in to help do so.\n\n2. **No age-restricted or obscene content.** Our community remains appropriate for anyone over the age of 13, any content deemed unfit for this is disallowed. This includes text, images or links. [Read More](https://canary.discord.com/channels/959551566388547676/987831168755961976/987831169783562300)\n\n3. **No shocking or overly violent/gory content.** If something straddles the line, ask a mod, CW, or don’t post it at all.\n\n4. **No spam or self-promotion.** (server invites, advertisements. etc.) Unless given explicit permission from a staff member. This includes DMing fellow members.\n\n5. **Treat everyone with respect.** Absolutely no harassment, witch hunting, sexism, racism or hate speech will be tolerated. [Read More](https://canary.discord.com/channels/959551566388547676/987831379456839730/987831380429914142)\n\n6. **Keep in mind effective conflict resolution and interpersonal skills.** [Read More](https://canary.discord.com/channels/959551566388547676/987831703345176606/987831705425551430)\n\n7. **Hate has no home here.** No hate speech, slurs, homophobia or transphobia is allowed under **ANY** circumstances. (Even in "joking" scenarios.) [Read More](https://canary.discord.com/channels/959551566388547676/987831957230583869/987831958988030002)\n\n8. **Please keep all conversations in English.** Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions.\n\n**By joining this server you agree to the following guidelines**\n[Discord ToS](https://discord.com/terms)\n[Discord Community Guidelines](https://discord.com/guidelines)')
    .setImage('https://i.imgur.com/CBbbw0d.png');

const notesReportEmbed = new EmbedBuilder()
    .setColor(0x6F6DB8)
    .setTitle('Notes / Report to staff')
    .setDescription('**Please be the bigger person**—if you see someone trying to start a fight, don\'t fight back; DM staff. Similarly, if you see anything that may cause issues or someone possibly willingly causing them, don’t try to argue them into submission. *Don’t feed the trolls, nor your own trauma responses*.\n\nIf you see something against the rules or something that makes you feel unsafe, let staff know. We want this space to be as inclusive and safe as possible. \n\n**To do this:**\n`Right-Click A Message > Apps > Report Message`\n\n***This directly reports the message to our server staff for us to best handle the situation as fast as possible <3 ***\n\n> *This does not report the message to discord, just our server staff*')
    .setImage('https://i.imgur.com/jxEcGvl.gif')
    .setFooter({
        text: 'If you are ever unsure if something is allowed, feel free to ask.',
    });

const mentalHealthEmbed = new EmbedBuilder()
    .setColor(0x6F6DB8)
    .setTitle('🔴 IMPORTANT 🔴')
    .setDescription('We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications to render proper assistance with mental health issues, nor are we able to give professional advice. Because of this, we do not have any vent/advice channels. We ask that you seek out appropriate help if you are experiencing a crisis and not depend on this server as an emotional crutch. Please avoid topics that are very heavy emotionally loaded. Thank you for understanding ❤️')
    .setImage('https://i.imgur.com/CBbbw0d.png');

const getVerifiedEmbed = new EmbedBuilder()
    .setColor(0x6F6DB8)
    .setTitle('Getting Verified')
    .setDescription('To become verified please hit the button below ⬇️\nBy clicking this button you agree to follow the rules listed above.\nThank you, and have fun in our community 💜\n\n***If the button fails: ***\n\n> Please make sure you\'ve clicked the button which looks like the image below in your discord client.')
    .setImage('https://i.imgur.com/CW0Wpgm.png')
    .setFooter({
        text: 'If it still fails after that, please feel free to DM @Cleo#1003',
    });

function buildWelcomeComponents(client) {
    /* Magic number. Appears to be the id of a message sent before the current welcome message.
       From original Theo code */
    const magicMessage = '987842342247608410';
    return [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(messageLink(config.channels.lobby, magicMessage, config.guild))
                    .setLabel('Scroll To Top!')
                    .setStyle(ButtonStyle.Link),
                client.getButton('startVerification'),
            ),
    ];
}

const welcomeEmbeds = [
    rulesImgEmbed,
    rulesEmbed,
    notesReportEmbed,
    mentalHealthEmbed,
    getVerifiedEmbed,
];

export {
    welcomeEmbeds,
    buildWelcomeComponents,
};
