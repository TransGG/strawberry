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

if guilds = '959551566388547676' or guilds = '1087014898199969873' or guilds = '638480381552754730' or guilds = '1116634030834733077':
    const rulesImgEmbed = new EmbedBuilder()
        .setColor(0xDF585B)
        .setImage('https://i.imgur.com/KGyMpU5.png');
    
    const rulesEmbed = new EmbedBuilder()
        .setColor(0xDF585B)
        .setTitle('Rules')
        .addFields(
            {
                name: '`1`. **Hate has no home here.**',
                value:
    '> No hate speech, slurs, homophobia, gatekeeping (including transmedicalism), or transphobia is allowed under **ANY** circumstances. (Even in "joking" scenarios.). **Please refrain from sharing any images or videos containing the above content, even if the intention is to criticise the individuals responsible.** [Read More]({{rule1}})',
            },
            {
                name: '`2`. **No age-restricted, obscene, shocking, gory, or overly violent content.**',
                value: '> Our community remains appropriate for anyone over the age of 13; any content deemed unfit for this is disallowed. If something straddles the line, ask a mod, CW, or don’t post it at all. This includes text, images, or links. [Read More]({{rule2}})',
            },
            {
                name: '`3`. **Avoid disallowed topics and phrases.**',
                value: '> This includes, but is not limited to: **heavy venting,** **political discussions,** **piracy,** and **promoting or extensively discussing the use of recreational substances, legal or otherwise.** `(#mature-general is an exception for legal substances)` More information on these banned topics can be found in `#politics`, `#venting`, or in our list of disallowed topics and phrases [here]({{rule3}})',
            },
            {
                name: '`4`. **Advocating any Illegitimate/DIY Medical treatment is not permitted, especially HRT, binders, and dosages.**',
                value: '> This extends to conversations about sourcing HRT through illegitimate means. Additionally, please refrain from discussing or encouraging DIY binders, as they have the potential to harm the wearer if not properly handled.',
            },
            {
                name: '5. **Treat everyone with respect.**',
                value: '> Refrain from engaging in any form of discrimination against others, regardless of age, gender, identity, orientation, and so forth. Absolutely no harassment, witch hunting, sexism, racism, or any form of hate targeting generalised groups of people will be tolerated. [Read More]({{rule5}})',
            },
            {
                name: '`6`. **Respect plural members, and only use PK for our allowed use cases.**',
                value: '> If you see users talking with the `[APP]` tag, they\'re talking through PluralKit. Due to Discord limitations, these messages will show up with the `[APP]` tag - however, they are not apps, they are users. **Additionally, PluralKit is only to be used as a mental health aid, not for any form of roleplay.** [Read More]({{rule6}})',
            },
            {
                name: '`7`. **Be considerate of others\' triggers.**',
                value: '> We understand that with such a diverse and large community, it\'s not always feasible to avoid every trigger. Nevertheless, please make an effort to acknowledge and respect others\' triggers, refrain from attempting to change their mind or prove them wrong. **Remember, as a member of this large community, your triggers are your responsibility too.** If a chat topic triggers you (unless listed below), consider stepping back and removing yourself from the situation until the conversation topic changes.\n\n> ***Note:*** *You can hide messages with triggering content by using a double upright slash:* TW ||trigger|| - ||content||. For instance, "TW ||spiders|| - ||Check out these [Spider Images]||." **You can find a list of common triggers** [Here]({{rule7}}).',
            },
            {
                name: '`8.` **Avoid mini-modding or arguing with moderators in chat.**',
                value: '> If you see rules being broken, please use our custom report `[Example Below]` feature or open a support ticket instead of taking matters into your own hands. Our staff team volunteer their time to ensure a positive environment, and their decisions are always made with the community\'s best interests at heart. If you ever have concerns regarding a decision we\'ve made, we welcome you to open a ticket or direct message a senior staff member or admin.',
            },
            {
                name: '`9`. **Keep in mind effective conflict resolution and interpersonal skills.**',
                value: '> Practise effective de-escalation — everyone has different ways of doing this, but some common tactics include conceding several points and then changing the topic, agreeing to disagree, stepping back from the conversation outright, calling a chat mod to mediate, and/or being the first to apologise. [Read More]({{rule9}})',
            },
            {
                name: '`10`. **No spam or self-promotion.**',
                value: '> Including but not limited to `[server invites, advertisements, etc.]`, **unless given explicit permission from a staff member.** This includes sending unsolicited server invites, advertisements, or direct messages with the intention of promoting content.',
            },
            {
                name: '`11`. **Keep on-topic in all channels.**',
                value: '>  We understand conversations naturally drift; however, if they do not self-correct after a while, a mod may step in to help do so.\n\n> *As well*, selfies are to be shared only in <#+1037517248862101504> [**\#selfies**]. This is to ensure the safety of all of our members. Access to the \#selfies channel will be granted after meeting server activity requirements.',
            },
            {
                name: '`12`. **Keep all conversations in English.**',
                value: '>  Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions. (Non-English threads are an exception. You can find a list of those [Here]({{rule12}}))',
            },
            {
                name: '** **\n**By joining this server you agree to the following guidelines**',
                value: '[Discord ToS](https://discord.com/terms)\n[Discord Community Guidelines](https://discord.com/guidelines)',
            },
        )
        .setImage('https://i.imgur.com/CBbbw0d.png'); // tiny image that ensures constant embed width
    
    const notesReportEmbed = new EmbedBuilder()
        .setColor(0xDF585B)
        .setTitle('Notes / Report to staff')
        .setDescription('**Please be the bigger person**—if you see someone trying to start a fight, don\'t fight back; DM staff. Similarly, if you see anything that may cause issues or someone possibly willingly causing them, don’t try to argue them into submission. *Don’t feed the trolls, nor your own trauma responses*.\n\nIf you see something against the rules or something that makes you feel unsafe, let staff know. We want this space to be as inclusive and safe as possible. \n\n**To do this:**\n`Right-Click A Message > Apps > Report Message`\n\n***This directly reports the message to our server staff for us to best handle the situation as fast as possible <3 ***\n\n> *This does not report the message to discord, just to our server staff.*')
        .setImage('https://i.imgur.com/jxEcGvl.gif')
        .setFooter({
            text: 'If you are ever unsure if something is allowed, feel free to ask.',
        });
    
    const mentalHealthEmbed = new EmbedBuilder()
        .setColor(0xDF585B)
        .setTitle('🔴 IMPORTANT 🔴')
        .setDescription('We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications necessary to render proper assistance with mental health issues, nor are we able to give professional advice. Because of this, we do not have venting channels. We ask that you seek out appropriate help if you are experiencing a crisis and not depend on this server as an emotional crutch. Please avoid topics that are very heavy emotionally loaded. Thank you for understanding ❤️')
        .setImage('https://i.imgur.com/CBbbw0d.png');

else if guilds = '928175231091236884':
     const rulesImgEmbed = new EmbedBuilder()
        .setColor(0xdf338c)
        .setImage('https://imgur.com/a/nRHL0wC');
    
    const rulesEmbed = new EmbedBuilder()
        .setColor(0xdf338c)
        .setTitle('Rules')
        .addFields(
            {
            name: '`1.` Users must follow Discord\'s [Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines).',
            value: '> To remain in compliance with ToS, do not post any sexually explicit content in user avatars, statuses, bios, server banners, icons, invite splashes, emojis, stickers, tags, or anywhere else that cannot be age - gated.'
            },
            {
            name: '`2.` Be respectful to your fellow server members.',
            value: '> Keep controversial arguments off of this server. This is a safe space for our users; if you and someone else agree to the discussion of a dramatic topic (such as politics, arguments / debates, AI, et cetera), please take it to DMs or don\'t discuss it at all.'
            },
            {
            name: '`3.` Hate is not welcome here.',
            value: '> Discrimination based on race, gender, sexuality, et cetera will not be tolerated. Additionally, joking about threats, sending gore, threatening to initiate a raid, and similar actions are prohibited.',
            },
            {
            name: '`4.` NSFW Discussions',
            value: '> NSFW [Not - Safe - For - Work] discussions on this server are ONLY allowed in their dedicated channels. Verification and rules for those channels can be found in <#949909003226476584>, which is visible if you qualify for access to the channel.',
            },
            {
            name: '`5.` Triggering Topics',
            value: '> Please keep all political discussions and potentially sensitive or \"fiery\" topics out of this server.',
            },
            {
            name: '`6.` Mental Health',
            value: '> Please keep all mental health - related topics in their specified channels. If you\re ever unsure of whether something is allowed or where to send it, please do not hesitate to open a ticket.',
            },
            {
            name: '`7.` System Accountability',
            value: '> This server utilises PluralKit, a bot that allows one profile to to present as multiple. Due to Discord\'s limitations, these users will show with the `APP` tag. They are not bots. Please treat them with the same respect you\'d afford to any other user.\n > Additionally, systems using our server should adhere to the following\: ```A. Any infractions from one alter will be accountable to the entire system.\n B. All systems must have a tag. Any account warned for this once and refusing to comply will be banned.\n C. Alters under 13 are not permitted on Discord.\n D. PluralKit is only to be used as a mental health aid, and not as a form of roleplay.```\n If you\'d like to learn more about how plurality works, you can click [here](https://morethanone.info/).',
            },
            {
            name: '`8.` Respect the Automod',
            value: 'Do not try to censor or get around content that is automodded. If you have a genuine issue with AUtomod picking up something you feel it shouldn\'t, please report it to staff.'
            {
            name: '`9.` Don\'t be a rules lawyer.',
            value: 'Follow the spirit of these rules, not just the letter. Obnoxious, taunting, disruptive, annoying or spammy behaviours will not be allowed here. It is your responsibility to follow the law and common sense when using our server.',
            },
        ),

    const reportsEmbed = new EmbedBuilder()
        .setcolor(0xdf338c)
        .setTitle('Important Message')
        .setdescription('It is your responsibility to be aware of our server rules and follow them. They exist to keep our community a safe space for those who may not have another place to go or people to talk to. To that end, our staff has the authority to act wherever and however necessary to protect the server.\n If there is content being sent that you find troubling or that may be in violation of our rules, please report it to staff. You will never be penalised for reporting something in good faith.')

function buildWelcomeComponents(client, magicMessage) {
    const extra = [
        client.getButton('startVerification'),
    ];

    if (config.guilds[magicMessage.guild.id].roles.emojiVoid) {
        extra.push(client.getButton('addEmojiVoid'));
    }

    return [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(
                        messageLink(
                            config.guilds[magicMessage.guild.id].channels.lobby,
                            magicMessage.id,
                            magicMessage.guild.id,
                        ),
                    )
                    .setLabel('Scroll To Rules!')
                    .setStyle(ButtonStyle.Link),
                ...extra,
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
