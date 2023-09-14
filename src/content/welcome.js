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
    .setColor(0xDF585B)
    .setImage('https://i.imgur.com/KGyMpU5.png');

const rulesEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('Rules')
    .addFields([
        {
            name: '`1`. **Hate has no home here.**',
            value:
            '> No hate speech, slurs, homophobia, gatekeeping (including transmedicalism), or transphobia is allowed under **ANY** circumstances. (Even in "joking" scenarios.). **Please refrain from sharing any Images/Videos containing the above content, even if the intention is to criticise the individuals responsible.** [Read More](https://canary.discord.com/channels/959551566388547676/1151689401643053107/1151694186257600522)',
        },
        {
            name: '`2`. **No age-restricted, obscene, shocking, gory, or overly violent content.**',
            value: '> Our community remains appropriate for anyone over the age of 13; any content deemed unfit for this is disallowed. If something straddles the line, ask a mod, CW, or don’t post it at all. This includes text, images, or links. [Read More](https://canary.discord.com/channels/959551566388547676/1151689483977236610/1151694304037838910)',
        },
        {
            name: '`3`. **Avoid disallowed topics and phrases.**',
            value: '> This includes, but is not limited to: **heavy venting,** **political discussions,** **piracy,** and **promoting or extensively discussing the use of recreational substances, legal or otherwise.** `(#mature-general is an exception for legal substances)` More information on these banned topics can be found in `#politics`, `#venting`, or in our list of disallowed topics and phrases [here](https://canary.discord.com/channels/959551566388547676/1151689644052840589/1151694373424218163)',
        },
        {
            name: '`4`. **Advocating any Illegitimate/DIY Medical treatment is not permitted, especially HRT, binders, and dosages.**',
            value: '> This extends to conversations about sourcing HRT through illegitimate means. Additionally, please refrain from discussing/encouraging DIY binders, as they have the potential to harm the wearers if not properly handled.',
        },
        {
            name: '5. **Treat everyone with respect.**',
            value: '> Refrain from engaging in any form of discrimination against others, regardless of age, gender, identity, orientation, and so forth. Absolutely no harassment, witch hunting, sexism, racism, or any form of hate targeting generalised groups of people will be tolerated. [Read More](https://canary.discord.com/channels/959551566388547676/1151689706912882758/1151694425110609941)',
        },
        {
            name: '`6`. **Respect plural members, and only use PK for our allowed use cases.**',
            value: '> If you see users talking with the bot tag, they\'re talking through PluralKit. Due to Discord limitations, these messages will show up with the `[BOT]` tag - however, they are not bots, they are users. **Additionally, PluralKit is only to be used as a mental health aid, not for any form of roleplay.**',
        },
        {
            name: '`7`. **Be considerate of others\' triggers.**',
            value: '> We understand that with such a diverse and large community, it\'s not always feasible to avoid every trigger. Nevertheless, please make an effort to acknowledge and respect others\' triggers, refrain from attempting to change their mind or prove them wrong. **Remember, as this large community, your triggers are also your responsibility too.** If a chat topic triggers you (unless listed below), consider stepping back and removing yourself from the situation until the conversation topic changes.\n\n> ***Note:*** *You can hide messages with triggering content by using a double upright slash:* TW ||trigger|| - ||content||. For instance, "TW ||spiders|| - ||Check out these [Spider Images]||." **You can find a list of common triggers** [Here](https://canary.discord.com/channels/959551566388547676/1151689903319564329/1151690023331172412).',
        },
        {
            name: '`8.` **Avoid mini-modding or arguing with moderators in chat.**',
            value: '> If you see rules being broken, please use our custom report `[Example Below]` feature or open a support ticket instead of taking matters into your own hands. Our staff team volunteer their time to ensure a positive environment, and their decisions are always made with the community\'s best interests at heart. If you ever have concerns regarding a decision we\'ve made, we welcome you to open a ticket or direct message a senior staff member or admin.',
        },
        {
            name: '`9`. **Keep in mind effective conflict resolution and interpersonal skills.**',
            value: '> Practise effective de-escalation—everyone has different ways of doing this, but some common tactics include conceding several points and then changing the topic, agreeing to disagree, stepping back from the conversation outright, calling a chat mod to mediate, and/or being the first to apologise. [Read More](https://canary.discord.com/channels/959551566388547676/1151689755537457265/1151694463127793674)',
        },
        {
            name: '`10`. **No spam or self-promotion.**',
            value: '> Including by not limited to `[server invites, advertisements, etc.]`, **unless given explicit permission from a staff member.** This includes sending unsolicited server invites, advertisements, or direct messages with the intention of promoting content.',
        },
        {
            name: '`11`. **Keep on-topic in all channels.**',
            value: '>  We understand conversations naturally drift; however, if they do not self-correct after a while, a mod may step in to help do so.',
        },
        {
            name: '`12`. **Keep all conversations in English.**',
            value: '>  Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions. (Non-English threads are an exception you can find the list of these threads [Here](https://canary.discord.com/channels/959551566388547676/1151689825687195678/1151694529750106186))"',
        },
        {
            name: '** **\n**By joining this server you agree to the following guidelines**',
            value: '[Discord ToS](https://discord.com/terms)\n[Discord Community Guidelines](https://discord.com/guidelines)',
        },
    ])
    .setImage('https://i.imgur.com/CBbbw0d.png'); // tiny image that ensures constant embed width

const notesReportEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('Notes / Report to staff')
    .setDescription('**Please be the bigger person**—if you see someone trying to start a fight, don\'t fight back; DM staff. Similarly, if you see anything that may cause issues or someone possibly willingly causing them, don’t try to argue them into submission. *Don’t feed the trolls, nor your own trauma responses*.\n\nIf you see something against the rules or something that makes you feel unsafe, let staff know. We want this space to be as inclusive and safe as possible. \n\n**To do this:**\n`Right-Click A Message > Apps > Report Message`\n\n***This directly reports the message to our server staff for us to best handle the situation as fast as possible <3 ***\n\n> *This does not report the message to discord, just our server staff*')
    .setImage('https://i.imgur.com/jxEcGvl.gif')
    .setFooter({
        text: 'If you are ever unsure if something is allowed, feel free to ask.',
    });

const mentalHealthEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('🔴 IMPORTANT 🔴')
    .setDescription('We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications to render proper assistance with mental health issues, nor are we able to give professional advice. Because of this, we do not have any vent/advice channels. We ask that you seek out appropriate help if you are experiencing a crisis and not depend on this server as an emotional crutch. Please avoid topics that are very heavy emotionally loaded. Thank you for understanding ❤️')
    .setImage('https://i.imgur.com/CBbbw0d.png');

function buildWelcomeComponents(client) {
    /* Magic number. Appears to be the id of a message sent before the current welcome message.
       From original Theo code */
    const magicMessage = '1057157755623968810';
    return [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(messageLink(config.channels.lobby, magicMessage, config.guild))
                    .setLabel('Scroll To Rules!')
                    .setStyle(ButtonStyle.Link),
                client.getButton('startVerification'),
                client.getButton('addEmojiVoid'),
            ),
    ];
}

const welcomeEmbeds = [
    rulesImgEmbed,
    rulesEmbed,
    notesReportEmbed,
    mentalHealthEmbed,
];

export {
    welcomeEmbeds,
    buildWelcomeComponents,
};
