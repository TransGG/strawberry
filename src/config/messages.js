import { ComponentType, MessageFlags } from 'discord.js';

const TPRulesPreamble = (path) => ({
    content: `A plaintext version of these rules, adapted for a better screenreader/text-to-speech experience, is available [here](<https://github.com/TransGG/resources/blob/main/${path}>).`,
});

const TPRulesImgMessage = {
    flags: MessageFlags.IsComponentsV2,
    components: [
        {
            type: ComponentType.Container,
            accentColor: 0xDF585B,
            components: [
                {
                    type: ComponentType.MediaGallery,
                    items: [
                        {
                            media: {
                                url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/tp-server-rules-header.png',
                            },
                            description: 'A decorative header that says Server Rules',
                        },
                    ],
                },
            ],
        },
    ],
};

const TPRulesMainMessage = (threads, rules) => ({
    flags: MessageFlags.IsComponentsV2,
    components: [
        {
            type: ComponentType.Container,
            accentColor: 0xDF585B,
            components: [
                {
                    type: ComponentType.TextDisplay,
                    content: `## Rules\n${
                        rules.map((content, index) => `${index + 1}. ${content}${
                            threads[index] ? ` **[Read More >>>](${threads[index]})**` : ''
                        }`).join('\n')
                    }`,
                },
            ],
        },
    ],
});

const TPRulesBottomMessage = ({ showReports }) => ({
    flags: MessageFlags.IsComponentsV2,
    components: [
        {
            type: ComponentType.Container,
            accentColor: 0xDF585B,
            components: [
                {
                    type: ComponentType.TextDisplay,
                    content: "## Additional Policies\nBy participating in this server, you agree to the following:\n- [Discord's Terms of Service](https://discord.com/terms)\n- [Discord's Community Guidelines](https://discord.com/guidelines)\nOur rules also apply to public elements of your profile. You may hide your bio in user settings under Data & Privacy, but all other elements of your profile will be visible and therefore must follow our rules.",
                },
                {
                    type: ComponentType.TextDisplay,
                    content: `Contacting Staff\nYou can open tickets and submit anonymous reports via the __#contact-staff__ channel (visible after verification) to talk to staff privately.\n\nPlease be the bigger person. If you see someone trying to start a fight, don't fight back. Instead, contact us in a ticket or report it. *Don't feed trolls or your own trauma responses.*${
                        showReports ? '\n\nTo report a user or message, right click (desktop) or long press (mobile) the user or message and select Apps > Badeline > Report User or Message. This reports the user or message to us and pings active moderators, which helps us best handle the situation as quickly as possible. This does not report the message to Discord.' : ''
                    }`,
                },
                ...(showReports
                    ? [
                        {
                            type: ComponentType.MediaGallery,
                            items: [{
                                media: {
                                    url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/how-to-report.gif',
                                },
                                description: 'A GIF showing the reporting process explained above.',
                            }],
                        },
                    ] : []),
                {
                    type: ComponentType.TextDisplay,
                    content: '## Automod and Moderator Discretion\nSome of our rules are enforced by automod, which may block your message. Do not try to bypass this. If you think something should not be blocked, contact us privately to discuss it.\n\nThese rules are not meant to be comprehensive. Moderators will do their best to maintain a comfortable and safe community and may take actions not explicitly outlined in the rules. If you disagree with any actions, open a ticket and we will review it. Follow the spirit of the rules.',
                },
                {
                    type: ComponentType.TextDisplay,
                    content: "## Important Notice\nWe are not mental health professionals. We'd like to render assistance in every way possible, but we don't have the capacity or qualifications to render mental health assistance, nor are we able to give professional advice. Because of this, we don't have any venting channels and ask that you seek appropriate help if you are experiencing a crisis. Avoid depending on this server as an emotional crutch and avoid topics that are very emotionally heavy or loaded. A list of mental health resources is provided in the __#help-resources__ channel (visible after verification). Thank you for your understanding.",
                },
            ],
        },
    ],
});

const notesReportEmbed = {
    color: 0xDF585B,
    title: 'Notes / Report to Staff',
    description: '**Please be the bigger person**—if you see someone trying to start a fight, don\'t fight back; DM staff. Similarly, if you see anything that may cause issues or someone possibly willingly causing them, don’t try to argue them into submission. *Don’t feed the trolls, nor your own trauma responses*.\n\nIf you see something against the rules or something that makes you feel unsafe, let staff know. We want this space to be as inclusive and safe as possible. \n\n**To do this:**\n`Right-Click A Message > Apps > Report Message`\n\n***This directly reports the message to our server staff for us to best handle the situation as fast as possible <3 ***\n\n> *This does not report the message to discord, just to our server staff.*',
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/how-to-report.gif' },
    footer: { text: 'If you are ever unsure if something is allowed, feel free to ask.' },
};

const mentalHealthEmbed = {
    color: 0xDF585B,
    title: '🔴 IMPORTANT 🔴',
    description: 'We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications necessary to render proper assistance with mental health issues, nor are we able to give professional advice. Because of this, we do not have venting channels. We ask that you seek out appropriate help if you are experiencing a crisis and not depend on this server as an emotional crutch. Please avoid topics that are very heavy emotionally loaded. Thank you for understanding ❤️',
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/embed-sizer.png' },
};

const GARulesEmbed1 = {
    color: 0xDF585B,
    title: 'Rules',
    fields: [
        {
            name: '`1.` Hate Has No Home Here.',
            value: '> Treat others with kindness and respect at all times. Avoid offensive behavior, personal attacks, and disrespectful language. Bigotry, slurs, harassment, hateful politics, or any other form of hate are not tolerated.',
        },
        {
            name: '`2.` No spam or self promotion.',
            value: '> Spam or self-promotion, such as sharing links or content related to external products or services, is only allowed if explicitly approved by the server administrators. This includes links to other discord servers and anything that could reasonably be considered spam.',
        },
        {
            name: '`3.` No Doxing or Sharing Personal Info.',
            value: '> Sharing personal information of any user without their consent is strictly prohibited. This includes names, addresses, contact details, or any other private information. Doing so with intent is grounds for a ban on all partnered servers.',
        },
        {
            name: '`4.` Limit Political Discussions',
            value: '> Our community is focused on keeping people safe, but we also want people to exercise their freedom of expression. To that end, especially because we are an explicitly anarchist server and because LGBTQIA+ and especially trans people have been politicized so much, political discussion is allowed. \n> Bigoted topics are banned. For a complete list, [click here](https://canary.discord.com/channels/1135300957572431902/1246845823950655498/1246846431332008008). \n> Staff reserve the right to shut down any heated discussion by any means necessary for the mood of the server.',
        },
        {
            name: '`5.` No Breaking Discord TOS or Community Guidelines.',
            value: '> Being under 13 is [not allowed](https://support.discord.com/hc/en-us/articles/360040724612-Why-is-Discord-asking-for-my-birthday). Furthermore discussions or sharing of any illegal content, including but not limited to malicious software, illegal drugs, or any other illicit activities, are also not allowed in the server.\n[Discord TOS](https://dis.gd/tos) and [Community Guidelines](https://dis.gd/guidelines).',
        },
        {
            name: '`6.` Respect plural members.',
            value: '> Respect plural members, and only use PK for our allowed use cases. If you see users talking with the bot tag, they\'re talking through PluralKit. Due to Discord limitations, these messages will show up with the [BOT] tag - however, they are not from bots, they are from users. Additionally, PluralKit is not for any form of roleplay. Any form of discrimination or hate against alters will be met with a ban. all forms and origins of plurality are accepted here. ***All users of an account are responsible for its conduct. This includes plural users. It is up to the collective users of an account to be responsible for what happens on their account.***',
        },
        {
            name: '`7.` Do not attempt to bypass the Automod.',
            value: '> This server uses auto-mod to block messages deemed NSFW, violent, or triggering. Do not attempt to circumvent the Automod.',
        },
        {
            name: '`8.` Age-Appropriate Content Only.',
            value: '> To ensure a safe and welcoming space for all, do not share any suggestive or explicit content, or engage in explicit discussions; even in the mature channels. We have minors in our community, and such content shouldn\'t be seen by minors. Absolutely no NSFW content can be included in your profile or on this server. [Read More](https://canary.discord.com/channels/1135300957572431902/1435465648498016276)',
        },
        {
            name: '`9.` Please keep all channels on-topic.',
            value: '> Please keep topics in a channel within the general theme of the channel. This includes venting staying within the venting channels. Topics about ||eating disorders, suicide, and self harm,|| and the like are strictly prohibited for the safety of members.',
        },
        {
            name: '`10.` Avoid mini-modding.',
            value: '> If you see rules being broken, please use our custom report `[Example Below]` feature or open a support ticket instead of taking matters into your own hands. Our staff team volunteer their time to ensure a positive environment, and their decisions are always made with the community\'s best interests at heart. If you ever have concerns regarding a decision we\'ve made, we welcome you to open a ticket.',
        },
        {
            name: '`11.` Keep all conversations in English.',
            value: '> Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions.',
        },
        {
            name: '`12.` Moderator Discretion',
            value: '> Our staff has the discretion to do what they find necessary to ensure a safe server for all. Remember to follow the spirit of these rules, not just the letter.',
        },
    ],
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/embed-sizer.png' },
};

const GAMentalHealthEmbed = {
    color: 0xDF585B,
    title: '🔴 IMPORTANT 🔴',
    description: 'We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications necessary to render proper assistance with mental health issues, nor are we able to give professional, medical, or legal advice. Thank you for understanding ❤️',
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/embed-sizer.png' },
};

const TP_RULES = [
    "**Hate has no home here.** No hate speech (e.g. slurs, gatekeeping). Don't share hateful media or images, even to criticize them.",
    '**Keep things appropriate and safe.** This is a 13+ community. No NSFW, roleplaying, flirting, or partner-seeking. Be mindful of your internet safety.',
    "**Avoid sensitive and controversial topics and discourse.** Avoid venting, politics, discussing substance use, controversial topics, phrases that target those with mental health challenges, links to X/Twitter, Meta, and TikTok, AI-generated content, and topics prohibited by Discord's Terms of Service.",
    "**Do not discuss DIY medical treatment.** For legal reasons, we can't allow discussion of DIY medical treatment (e.g. HRT, binders). Refrain from seeking or providing specific medical advice.",
    "**Treat everyone with respect.** No discrimination or harassment. Assume good faith and don't assume malice based on your biases. Respect all good-faith identities.",
    '**Respect plural users. We operate on system accountability.** Users talking with `[APP]` beside their name are using [PluralKit](https://pluralkit.me/) and are real users, not bots. PluralKit is only to be used as a mental health aid for plurality. Systems will be held responsible as a whole for moderation and must set a system tag to use PluralKit.',
    "**Be mindful of triggers.** Respect others' triggers. You can add trigger warnings like so: `TW ||trigger||: ||content||` = TW ||trigger||: ||content||. A list of common triggers is included in the details for this rule. Flashy media, excessively loud noises, and similar content must come with adequate warning, including in voice channels. Your triggers are also your responsibility to manage.",
    '**Avoid mini-modding or arguing publicly.** Report rule violations and avoid taking matters into your own hands. If you disagree with a staff action, contact us privately rather than arguing publicly.',
    "**Practice effective conflict resolution and de-escalation.** Avoid escalating disagreements to arguments. Avoid letting conversations become personal or heated. Don't assume bad faith and report hateful rhetoric instead of arguing.",
    '**No spam or self-promotion.** Do not promote server invites, advertise, or solicit, including in DMs. Contact us to request a partnership or an exemption.',
    '**Stay on-topic and only post selfies in the selfies channel.** Avoid conversing in media-sharing channels. Respect the audience of clubhouse channels. Selfies are only permitted in the __#selfies__ channel (access is granted upon meeting server activity requirements).',
    '**English only, and keep things accessible.** Short phrases, jokes, and references in other languages are fine, but keep conversations in English. A list of language threads is provided in the details for this rule as an exception. Using symbols that look like letters to spell is not allowed, including in display names.',
];

const EP_RULES = [
    ...TP_RULES.slice(0, 10),
    '**Stay on-topic.** Avoid extended discussion in the media-sharing channels <#1087014899454054449>, <#1087014899454054450>, and <#1087014899454054451> so as to not bury the media people are sharing.',
    '**English only, and keep things accessible.** Short phrases, jokes, and references in other languages are fine, but keep conversations in English. Using symbols that look like letters to spell is not allowed, including in display names.',
];

const TSO_RULES = [
    ...EP_RULES.slice(0, 10),
    '**Stay on-topic.** Avoid extended discussion in <#1109902677107818547> so as to not bury the music people are sharing.',
    ...EP_RULES.slice(11),
];

const TP_THREADS = [
    'https://discord.com/channels/959551566388547676/1547499338018857051',
    'https://discord.com/channels/959551566388547676/1547499342909284362',
    'https://discord.com/channels/959551566388547676/1547499347116167270',
    'https://discord.com/channels/959551566388547676/1547499352048803850',
    'https://discord.com/channels/959551566388547676/1547499356586774589',
    'https://discord.com/channels/959551566388547676/1547499361813004379',
    'https://discord.com/channels/959551566388547676/1547499366548246568',
    'https://discord.com/channels/959551566388547676/1547499371904638998',
    'https://discord.com/channels/959551566388547676/1547499377285931008',
    'https://discord.com/channels/959551566388547676/1547499382268629006',
    'https://discord.com/channels/959551566388547676/1547499387326824448',
    'https://discord.com/channels/959551566388547676/1547499393597575288',
];

const EP_THREADS = [
    'https://discord.com/channels/1087014898199969873/1547498018390020106',
    'https://discord.com/channels/1087014898199969873/1547498026539421816',
    'https://discord.com/channels/1087014898199969873/1547498032386547765',
    'https://discord.com/channels/1087014898199969873/1547498039416201317',
    'https://discord.com/channels/1087014898199969873/1547498045845803008',
    'https://discord.com/channels/1087014898199969873/1547498050027786302',
    'https://discord.com/channels/1087014898199969873/1547498056537079918',
    'https://discord.com/channels/1087014898199969873/1547498062874677278',
    'https://discord.com/channels/1087014898199969873/1547498071338909726',
    'https://discord.com/channels/1087014898199969873/1547498076892176535',
    null,
    'https://discord.com/channels/1087014898199969873/1547498085972975707',
];

const TSO_THREADS = [
    'https://discord.com/channels/638480381552754730/1547497992330813463',
    'https://discord.com/channels/638480381552754730/1547497997070237727',
    'https://discord.com/channels/638480381552754730/1547498001251962953',
    'https://discord.com/channels/638480381552754730/1547498005815361586',
    'https://discord.com/channels/638480381552754730/1547498009712001065',
    'https://discord.com/channels/638480381552754730/1547498014237794416',
    'https://discord.com/channels/638480381552754730/1547498030377209898',
    'https://discord.com/channels/638480381552754730/1547498036027064491',
    'https://discord.com/channels/638480381552754730/1547498041312022568',
    'https://discord.com/channels/638480381552754730/1547498046286200863',
    null,
    'https://discord.com/channels/638480381552754730/1547498051374026765',
];

export const TPRulesMessages = [TPRulesPreamble('raw/rules/transplace.md'), TPRulesImgMessage, TPRulesMainMessage(TP_THREADS, TP_RULES), TPRulesBottomMessage({ showReports: true })];
export const EPRulesMessages = [TPRulesPreamble('raw/rules/enbyplace.md'), TPRulesImgMessage, TPRulesMainMessage(EP_THREADS, EP_RULES), TPRulesBottomMessage({ showReports: false })];
export const TSORulesMessages = [TPRulesPreamble('raw/rules/transonance.md'), TPRulesImgMessage, TPRulesMainMessage(TSO_THREADS, TSO_RULES), TPRulesBottomMessage({ showReports: false })];

export const GARulesMessages = [
    { embeds: [GARulesEmbed1, notesReportEmbed, GAMentalHealthEmbed] },
];

export const CDLFRulesImgEmbed = {
    color: 0xFF52F3,
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/cdlf-rules-header.png' },
};

export const CDLFRulesEmbed = {
    color: 0xFF52F3,
    title: 'Rules',
    fields: [ 
        { 
            name: '`0.` Rule Zero:',
            value: '> Rules are the foundation of a healthy server. Any attempt to create loopholes in these rules will be addressed.',
        },
        {
            name: '`1.` All users must follow Discord ToS & Community Guidelines.',
            value: '> In compliance with Discord ToS, do not post sexually explicit content in user avatars, custom statuses or bios, server banners, server icons, invite splashes, emoji, stickers, or any other space that cannot be age-restricted. See https://discord.com/terms and https://discord.com/guidelines for the complete policies.',
        },
        {
            name: '`2.` Be respectful to your fellow server members.',
            value: '> Don\'t start dramatic or flammable conversations on the server. If all parties agree to such a discussion (politics, arguments, AI, et cetera), take it to DMs.',
        },
        {
            name: '`3.` Hate has no home here.',
            value: '> No discrimination based on race, gender, sexuality, nationality, or any other category that one may not have control over will be tolerated.',
        },
        {
            name: '`4.` This is a server with minors present.',
            value: '> Absolutely ZERO NSFW content, subject matter, or discussions shall be permitted on this server.',
        },
        {
            name: '`5.` Don\'t spam the server.',
            value: '> No spamming, raiding, threats, jokes of threats/ violence, or gore. This also includes wishing death on anyone, even if we don\'t agree with their views.',
        },
        {
            name: '`6.` No politics.',
            value: '> Political discussions or discussions about other sensitive/triggering matters are not allowed here. These include discussion about groups of people who have harmed others, even if it is not condemning or condoning.',
        },
        {
            name: '`7.` Keep on topic in all channels.',
            value: '> Specifically, keep any and all mental health related topics such as anxiety, depression, suicidal thoughts, etc. in the specified mental health channels: <#950153059303051344>, <#928175714442821712>, <#949436159820431390>, <#1054127049905819658>, and <#949448500469436456>. (18-support, emotional-support, no-reply-vent, anonymous-support, and vent-general, respectively.)',
        },
        {
            name: '`8.` Use common sense.',
            value: '> Disruptive, purposefully obnoxious, or taunting behaviors are not acceptable in the server. It is your responsibility to follow these rules as well as any actions that fall under common sense and basic online etiquette.',
        },
        {
            name: 'PluralKit',
            value: '> This server utilizes <@&972632927160655875>, a bot that allows one profile to present as multiple. Due to <@466378653216014359>\'s limitations, users may appear with a \'bot\' tag beside their name—these are not sentient bots, these are real people. Systems using <@&972632927160655875> will need to abide by the rules below. To learn more about plurality, visit <https://morethanone.info/>',
        },
        {
            name: '`S1.` System Responsibility',
            value: '> The entire system is accountable for all infractions.',
        },
        {
            name: '`S2.` System Clarity',
            value: '> All systems must use a system tag for all messages on the server.',
        },
        {
            name: '`S3.` Age',
            value: '> Keep under 13 alters/littles/headmates out of the server.',
        },
    ], 
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/embed-sizer.png' },
}

export const CDLFSupplementalEmbed = {
    color: 0xFF52F3,
    title: 'Additional Information',
    description: [
        '**As a member of the server, you are expected to be aware and up to date on these rules. Ignorance or lack of focus is not an excuse and does not pardon you from any moderator actions.**',
        '**Users who act as bystanders or provoke users may be punished as moderators see fit. This includes instances of DMing members including chasers, scammers, trolls, etc. Moderators do not have to justify their actions to anyone other than administration.**',
        '**If you have any questions relating to the rules, feel free to ask the mods in <#949749180295958608> (ask-a-mod).**',
        '**If you see an intentional rule break, ping staff ASAP with the <@&949479574373298287> tag.**',
        '**If you see a concerning user or want to report a user anonymously, DM an online staff member immediately.**',
    ].join('\n\n'),
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/embed-sizer.png' },
}

export const CDLFRulesMessages = [
    { embeds: [CDLFRulesImgEmbed, CDLFRulesEmbed, CDLFSupplementalEmbed] },
]
    

const TPRulesImgEmbed = {
    color: 0xDF585B,
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/tp-server-rules-header.png' },
};

const TPRulesEmbed = ({ selfiesChannelId, disallowSelfies }) => ({
    color: 0xDF585B,
    title: 'Rules',
    fields: [
        {
            name: '`1`. **Hate has no home here.**',
            value: '> No hate speech, slurs, homophobia, gatekeeping (including transmedicalism), or transphobia is allowed under **ANY** circumstances. (Even in "joking" scenarios.). **Please refrain from sharing any images or videos containing the above content, even if the intention is to criticise the individuals responsible.** [Read More]({{rule1}})',
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
            name: '`5`. **Treat everyone with respect.**',
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
            name: '`8`. **Avoid mini-modding or arguing with moderators in chat.**',
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
            value: `> We understand conversations naturally drift; however, if they do not self-correct after a while, a mod may step in to help do so.${disallowSelfies ? '\n\n> *As well*, selfies are not allowed to be posted for now. A selfies channel will be opened in the future to allow posting selfies in a manner that is safer for everyone.' : ''}${!disallowSelfies && selfiesChannelId ? `\n\n> *As well*, selfies are to be shared only in <#${selfiesChannelId}> (**#selfies**). This is to ensure the safety of all of our members. Access to the **#selfies** channel will be granted after meeting server activity requirements.` : ''}`,
        },
        {
            name: '`12`. **Keep all conversations in English.**',
            value: '> Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions. (Non-English threads are an exception. You can find a list of those [Here]({{rule12}}))',
        },
        {
            name: '** **\n**By joining this server you agree to the following guidelines**',
            value: '[Discord ToS](https://discord.com/terms)\n[Discord Community Guidelines](https://discord.com/guidelines)',
        },
    ],
    image: { url: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/embed-sizer.png' },
});

export const TPRulesMessagesObsolete = (config) => [
    { embeds: [TPRulesImgEmbed, TPRulesEmbed(config)] },
    { embeds: [notesReportEmbed, mentalHealthEmbed] },
];
