import { EmbedBuilder } from 'discord.js';

export const TPrulesImgEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setImage('https://i.imgur.com/KGyMpU5.png');

export const TPrulesEmbed = new EmbedBuilder()
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
            value: '>  We understand conversations naturally drift; however, if they do not self-correct after a while, a mod may step in to help do so.\n\n> *As well*, selfies are to be shared only in <#+1037517248862101504> [**#selfies**]. This is to ensure the safety of all of our members. Access to the #selfies channel will be granted after meeting server activity requirements.',
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

export const notesReportEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('Notes / Report to staff')
    .setDescription('**Please be the bigger person**—if you see someone trying to start a fight, don\'t fight back; DM staff. Similarly, if you see anything that may cause issues or someone possibly willingly causing them, don’t try to argue them into submission. *Don’t feed the trolls, nor your own trauma responses*.\n\nIf you see something against the rules or something that makes you feel unsafe, let staff know. We want this space to be as inclusive and safe as possible. \n\n**To do this:**\n`Right-Click A Message > Apps > Report Message`\n\n***This directly reports the message to our server staff for us to best handle the situation as fast as possible <3 ***\n\n> *This does not report the message to discord, just to our server staff.*')
    .setImage('https://i.imgur.com/jxEcGvl.gif')
    .setFooter({
        text: 'If you are ever unsure if something is allowed, feel free to ask.',
    });

export const mentalHealthEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('🔴 IMPORTANT 🔴')
    .setDescription('We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications necessary to render proper assistance with mental health issues, nor are we able to give professional advice. Because of this, we do not have venting channels. We ask that you seek out appropriate help if you are experiencing a crisis and not depend on this server as an emotional crutch. Please avoid topics that are very heavy emotionally loaded. Thank you for understanding ❤️')
    .setImage('https://i.imgur.com/CBbbw0d.png');

export const GArulesEmbed1 = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('Rules')
    .addFields(
        {
            name: '`1.` Be civil and respectful.',
            value: 'Treat others with kindness and respect at all times. Avoid offensive behavior, personal attacks, and disrespectful language. Disagreements are acceptable, but keep discussions constructive and avoid being overly confrontational. No slurs in ANY way. [Read More]({{rule1}})',
        },
        {
            name: '`2.` No spam or self promotion.',
            value: 'Do not flood the server with irrelevant or repetitive messages. Self-promotion, such as sharing links or content related to external products or services, is only allowed if explicitly approved by the server administrators. \nThis includes the promotion or offering invites to other discord servers. Even if you yourself don\'t own it. It still is promoting another discord server, and forbidden.',
        },
        {
            name: '`3.` No Doxing or Sharing Personal Info.',
            value: 'Sharing personal information of any user without their consent is strictly prohibited. This includes real names, addresses, contact details, or any other private information.',
        },
        {
            name: '`5.` No Breaking Discord TOS or Community Guidelines.',
            value: 'Being under 13 is [not allowed]({{rule5}})',
        },
        {
            name: '`6.` Absolutely No Bigotry.',
            value: 'There is a zero-tolerance policy towards any form of bigotry. This includes transphobia, homophobia, racism, sexism, and any discriminatory attitudes towards individuals based on their identity or orientation. [Read More]({{rule6}})',
        },
        {
            name: '`7.` No Pedophilia Apologism.',
            value: 'Under no circumstances should pedophilia be normalized or defended. This includes any attempts to compare it favorably to non-heterosexual sexualities or discussions involving drawn/animated child pornography.',
        },
        {
            name: '`8.` Age-Appropriate Content Only.',
            value: 'To ensure a safe and welcoming space for all, please avoid sharing any suggestive or explicit content, as well as engaging in explicit discussions. We have minors in our community, and such content shouldn\'t be seen by minors. Absolutely 0 NSFW content should be included in your profile.  [Read More]({{rule8}})',
        },
        {
            name: '`9.` Please keep all channels on-topic.',
            value: 'Please keep topics in a channel within the general theme of the channel. This includes venting staying within the venting channels. Topics about ||eating disorders, suicide, and self harm,|| are strictly prohibited for the safety of members.',
        },
        {
            name: '`10.` No spam.',
            value: 'Please do not spam within the server. This includes spam pinging members and roles.',
        },
    )
    .setImage('https://i.imgur.com/CBbbw0d.png');

export const GArulesEmbed2 = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('Rules pt.2 Electric Boogaloo')
    .addFields(
        {
            name: '`11.` No mini-modding.',
            value: 'It gets in the way of mods doing our job. If you\'re not a mod, you do not have the power to moderate effectively. [Example of mini-modding and how it\'s ineffective on the Hypixel forums.]({{rule11}})',
        },
        {
            name: '`12.` Do not impersonate anyone.',
            value: 'It can cause others to become uncomfortable. Additionally users should be allowed to control their own image. As one of two exceptions on this list, if you\'d like to for a joke, please ASK that member first!',
        },
        {
            name: '`13.` Respect plural members.',
            value: 'Respect plural members, and only use PK for our allowed use cases. If you see users talking with the bot tag, they\'re talking through PluralKit. Due to Discord limitations, these messages will show up with the [BOT] tag - however, they are not bots, they are users. Additionally, PluralKit is not for any form of roleplay. Any form of discrimination or hate against alters will be met with a ban, all forms and origins of plurality are accepted here. ***All users of an account are responsible for its conduct. This includes plural users. It is up to the collective users of an account to be responsible for what happens on their account.***',
        },
        {
            name: '`15.` Honesty.',
            value: 'Please do not spread lies. This especially includes lying about your age, as doing so is a bannable offense . This has the exception of the <#1150588260729499778> channel, as long as they aren\'t actively harmful!',
        },
        {
            name: '`16.` Keep all conversations in English.',
            value: 'Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions. [Read More]({{rule16}})',
        },
        {
            name: '`17.` Do not bypass auto-mod.',
            value: 'This server uses auto-mod to block messages deemed nsfw, violent, or triggering. Do not circumvent the auto-mod. [Read More]({{rule17}})',
        },
        {
            name: '`18.` Limit political discussion.',
            value: 'Our community is focused on keeping our members safe, but we also want to give people freedom of discussion. To that end, especially because we are an explicitly anarchist server and because LGBTQIA+ and especially trans people have been politicized so much, political discussion is allowed.\n\nHOWEVER, that only extends to politics that are accepting of others and human rights. That means LGBTQIA+ politics, ACAB, trans rights, black lives matter, general leftist politics, etc. \n\nAny form of bigoted politics including nazism and general bigotry, cops, landlords, general conservativism, politics spouted by people such as Joe Rogan and Andrew Tate, tankies, and the like is banned. \n\nFor a full list of topics, please see [Read More]({{rule18}})\n\nNote that any political discussion that gets heated, even if it is leftist in nature, is also strictly banned for the safety and comfort of our members.',
        },
        {
            name: '`19.` Moderators have discretion to do what they see fit.',
            value: 'If you\'re misbehaving, but it\'s not against any single rule, mods may take any action they see fit, within reason. If you believe a moderator has used this to abuse their power, please #contact-staff.',
        },
    )
    .setImage('https://i.imgur.com/CBbbw0d.png');

export const GAmentalHealthEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('🔴 IMPORTANT 🔴')
    .setDescription('We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications necessary to render proper assistance with mental health issues, nor are we able to give professional advice. Thank you for understanding ❤️')
    .setImage('https://i.imgur.com/CBbbw0d.png');
