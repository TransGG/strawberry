import { ChannelType, ThreadAutoArchiveDuration } from 'discord.js';
import 'dotenv/config';
import { FatalError } from '../bot/utils/errors.js';
import { TPRulesMessages, GARulesMessages, CDLFRulesMessages } from './messages.js';

// for easier reading
/* eslint-disable max-len */
/**
 * @property {boolean}   debug      - Whether debug mode is enabled
 * @property {boolean}   verbose    - Whether verbose output is enabled
 * @property {function}  debugOut   - Function to be called for debug output
 * @property {function}  verboseOut - Function to be called for verbose output
 * @property {Snowflake} clientId   - The id of the bot to which application commands are registered, in the form of a Discord Snowflake
 * @property {string}    token      - The token of the bot
 * @property {Snowflake} guild      - Id of a guild to register commands in
 * @property {Object}    guild.channels   - Relevant channels
 * @property {Snowflake} guild.channels.lobby               - The channel unverified users start verification from
 * @property {Snowflake} guild.channels.verifyLogs          - Main log channel for verification logs
 * @property {Snowflake} guild.channels.theoSendLogs      - Log channel for staff anonymized messages
 * @property {Snowflake} guild.channels.verifyLogsSecondary - Secondary log channel for verification logs. Currently used for verify kick logs
 * @property {Snowflake} guild.channels.welcome             - Secondary log channel for verification logs. Currently used for verify kick logs
 * @property {Snowflake} guild.channels.general             - General channel
 * @property {Snowflake} guild.channels.introduce           - Channel for self-introductions
 * @property {Object}    guild.roles   - Relevant roles
 * @property {Snowflake} guild.roles.verifier - Verifier: the chief agents of the verification process
 * @property {Snowflake} guild.roles.verified - Verified: the role that is awarded to people who get verified
 * @property {Snowflake} guild.roles.greeter  - Greeter: role to be notified of new members
 * @property {any[]}     guild.questions      - Question categories
 * @property {Object}    guild.links   - Links for templating the rules embeds
 * @property {Object}    guild.invite  - The guild's invite link
 * @property {Object}    guild.proxy   - Configuration for the proxy that sends reminders/follow-up messages
 * @property {string}    guild.proxy.name     - The name of the webhook
 * @property {string}    guild.proxy.displayName  - The display name of the webhook
 * @property {string}    guild.proxy.avatarURL    - The avatar URL
 * @property {string}    guild.proxy.heartEmoji   - The string form of the heart emoji in the "verifiers have been pinged" message
 * @property {string}    guild.proxy.welcomeEmoji - The string form of the emoji in the "welcome, {applicant}" message
 * @property {string}    guild.proxy.thanksEmoji  - The string form of the emoji in the "answer within 3 hours, thanks" message
 * @property {string}    guild.proxy.bumpEmoji    - The string form of the emoji in the "hi there, it's been 3 hours" message
 * @property {any[]}     guild.rulesMessages  - An array of messages (each being an embed array) for the rules
 */
const config = {
    verboseOut: () => {},
    clientId: '',
    token: process.env.TOKEN,
    guilds: {},
};

const TPproxy = {
    name: 'Verification Kyle Proxy',
    displayName: 'Kyle ♡ [Any Pronouns]',
    avatarURL: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/proxy-avatar-kyle.png',
    heartEmoji: '<:max_heart:968321960557809674>',
    welcomeEmoji: '<a:TPF_GawrGura_Wave:968391057828093952>',
    thanksEmoji: '<a:TPA_Trans_Heart:960885444285968395>',
    bumpEmoji: '<a:TPF_Squid_Wave:968411630981496852>',
};

const GAproxy = {
    name: 'Verification Caitlyn Proxy',
    displayName: 'Caitlyn ♡ [She/Her]',
    avatarURL: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/proxy-avatar-caitlyn.png',
    heartEmoji: '<:GayHeart:1135714747803783269>',
    welcomeEmoji: '<:DemonThumbsup:1147951767682818201>',
    thanksEmoji: '<:DemonCelebrate:1147951774683119676>',
    bumpEmoji: '<:DemonFire:1147951717888041001>',
};

const CDLFproxy = {
    name: 'Verification Jenna Proxy',
    displayName: 'Jenna ♡ [She/Her]',
    avatarURL: 'https://raw.githubusercontent.com/TransGG/assets/refs/heads/main/proxy-avatar-jenna.png',
    heartEmoji: '<:LGBTPride1:950991161093423135>',
    welcomeEmoji: '<a:TPF_GawrGura_Wave:968391057828093952>',
    thanksEmoji: ':pray:',
    bumpEmoji: ':eyes:',
};

const defaultQuestions = [
    {
        id: 'trans',
        title: 'Transgender / Genderfluid / Nonbinary',
        description: 'If you identify as part of the transgender/genderfluid/nonbinary umbrella',
        questions: [
            'What is your favorite rule from our server rules?',
            'What do E and T mean in trans contexts?',
            'What does the word Transgender mean to you?',
            'How did you figure out your gender identity?',
        ],
    },
    {
        id: 'questioning',
        title: 'Transgender Questioning',
        description: 'If you are questioning whether you are transgender/genderfluid/nonbinary',
        questions: [
            'What is your favorite rule from our server rules?',
            'If you could change three things about yourself right now, what would they be?',
            'What does the word Transgender mean to you?',
            'What made you begin questioning your gender identity?',
        ],
    },
    {
        id: 'cis',
        title: 'Cisgender / Other LGBTQ+',
        description: 'If you are cisgender, regardless of whether you are otherwise LGBTQ+',
        questions: [
            'What is your favorite rule from our server rules?',
            'What about this server being trans-focused made you want to join?',
            'What would you do as/being an ally in this server?',
            'What does the word Transgender mean to you?',
        ],
    },
];

const cdlfQuestions = [
    {
        id: 'trans',
        title: 'Transgender / Genderfluid / Nonbinary',
        description: 'Select if you know you\'re trans.',
        questions: [
            'What is your favourite rule from our server rules?',
            'What about this server being trans-focused made you want to join?',
            'Do you fall under the femme / trans-femme umbrella? If so, how?',
            'How did you figure out your gender identity?',
            'What pronouns do you use?',
        ],
    },
    {
        id: 'cis',
        title: 'Cisgender / Other LGBTQ+',
        description: 'Select if you\'re cis or another LGBTQ identity.',
        questions: [
            'What is your favourite rule from our server rules?',
            'What about this server being trans-focused made you want to join?',
            'Do you fall under the femme / trans-femme umbrella? If so, how?',
            'How did you figure out your gender identity?',
            'What would you do as an ally in this server?',
            'What pronouns do you use?',
        ],
    },
    {
        id: 'questioning',
        title: 'Transgender Questioning',
        description: 'Select if you think you might be trans, but aren\'t sure.',
        questions: [
            'What is your favourite rule from our server rules?',
            'What about this server being trans-focused made you want to join?',
            'Do you fall under the femme / trans-femme umbrella? If so, how?',
            'What does the word Transgender mean to you?',
            'What pronouns do you use?',
        ],
    },
];

const development = {
    debugOut: console.debug,
    verboseOut: console.info,
    clientId: '1255572601590382725',
    guilds: {
        '985931648094834798': {
            // TPDevs
            sync: [
                '981615050664075404', // TPSupporters
            ],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '1097203594631073933',
                verifyLogs: '1097203635689107516',
                verifyLogsSecondary: '1097203656551583865',
                theoSendLogs: '1364027965847109662',
                welcome: '1105354623243538462',
                general: '1097203694539387111',
                introduce: '1097203721802354868',
            },
            roles: {
                staffRoles: ['986220638958137355'],
                verifier: '1046271388782186590',
                verified: '1092270181012742144',
                newbie: '1121688453566959697',
                noImages: '1121664177333878844',
                place: '1121666104390058115',
                member: '1105354354501881866',
                greeter: '1097204070252548097',
            },
            questions: [
                ...cdlfQuestions,
                {
                    id: ':3',
                    title: 'Secret Third Thing',
                    description: 'Secret third thing that is neither transgender nor cisgender',
                    questions: [
                        ':3',
                        ':3',
                        ':3',
                    ],
                },
            ],
            links: {
                rules: 'https://google.com/1-rules',
                rule1: 'https://google.com/1-1',
                rule2: 'https://google.com/1-2',
                rule3: 'https://google.com/1-3',
                rule5: 'https://google.com/1-5',
                rule7: 'https://google.com/1-7',
                rule9: 'https://google.com/1-9',
                rule12: 'https://google.com/1-12',
            },
            invite: 'https://google.com',
            proxy: GAproxy,
            rulesMessages: GARulesMessages,
        },
        '981615050664075404': {
            // TPSupporters
            sync: [
                '985931648094834798', // TPDevs
            ],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '1255574457800720514',
                verifyLogs: '1255574478264467597',
                verifyLogsSecondary: '1255574493594914826',
                theoSendLogs: '1364028107920642078',
                welcome: '1255574514687803575',
                general: '1255574526171938866',
                introduce: '1255574539891376189',
            },
            roles: {
                staffRoles: ['981615050743758902'],
                verifier: '1085626093014364272',
                verified: '1085625471972159539',
                noImages: '1135756628390588456',
                member: '1255574835166449764',
                newbie: '1085625477001125950',
                greeter: '1085625570144043039',
                inactivityPing: '1101453059860746270',
                emojiVoid: '1101452907490062358',
            },
            questions: defaultQuestions,
            links: {
                rules: 'https://google.com/2-rules',
                rule1: 'https://google.com/2-1',
                rule2: 'https://google.com/2-2',
                rule3: 'https://google.com/2-3',
                rule5: 'https://google.com/2-5',
                rule7: 'https://google.com/2-7',
                rule9: 'https://google.com/2-9',
                rule12: 'https://google.com/2-12',
            },
            invite: 'https://yahoo.com',
            proxy: TPproxy,
            rulesMessages: TPRulesMessages,
        },
    },
};

const production = {
    debugOut: () => { },
    verboseOut: () => { },
    clientId: '964615352489222225', // Theo
    guilds: {
        '959551566388547676': {
            // TransPlace
            sync: [
                '1087014898199969873', // EnbyPlace
                '638480381552754730', // Transonance
            ],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread, // test server does not have server premium level for private threads
            channels: {
                lobby: '1057132419150532678',               // TransPlace:welcome-verify
                verifyLogs: '987377031434100747',           // TransPlace:verify-logs
                verifyLogsSecondary: '1025521840816402442', // TransPlace:verify-kick-logs
                theoSendLogs: '1364039747638530120',        // TransPlace:theo-send-logs
                welcome: '978883070662959134',              // TransPlace:welcome-wagon
                general: '960920453705257061',              // TransPlace:rules-info
                introduce: '964221571071869050',            // TransPlace:entrance-hall
            },
            roles: {
                staffRoles: [
                    // [Active]
                    '981735525784358962',  // Admin
                    '1229965330869391430', // Admin (Hidden)
                    '1012954384142966807', // Sr Mod
                    '981735650971775077',  // Moderator
                    '1069398630944997486', // Trial Mod
                    '959916105294569503',  // Verifier

                    // [On-Leave]
                    '995822941663154206',  // Admin [On-Leave]
                    '1046488017151463586', // Sr Mod [On-Leave]
                    '996798320649457667',  // Moderator [On-Leave]
                    '1069399026614681700', // Trial Mod [On-Leave]
                    '996798409061171221', // verifier [On-Leave]
                ],
                verifier: '959916105294569503',
                verified: '959748411844874240',
                noImages: '1105701184406306876',
                place: '1115073100174860298',
                member: '1105230385769623584',
                newbie: '1085261027807088710',
                greeter: '978861945253945394',
                inactivityPing: '1097289190682660884',
                emojiVoid: '1093196851169218560',
            },
            questions: defaultQuestions,
            links: {
                rules: 'https://canary.discord.com/channels/959551566388547676/1057132419150532678/1379598680251699330',
                rule1: 'https://canary.discord.com/channels/959551566388547676/1151689401643053107/1151694186257600522',
                rule2: 'https://canary.discord.com/channels/959551566388547676/1151689483977236610/1151694304037838910',
                rule3: 'https://canary.discord.com/channels/959551566388547676/1151689644052840589/1151694373424218163',
                rule5: 'https://canary.discord.com/channels/959551566388547676/1151689706912882758/1151694425110609941',
                rule6: 'https://canary.discord.com/channels/959551566388547676/1378897773243666454/1378898091620700230',
                rule7: 'https://canary.discord.com/channels/959551566388547676/1151689903319564329/1151690023331172412',
                rule9: 'https://canary.discord.com/channels/959551566388547676/1151689755537457265/1151694463127793674',
                rule12: 'https://canary.discord.com/channels/959551566388547676/1151689825687195678/1151694529750106186',
            },
            invite: 'https://discord.gg/TransPlace',
            proxy: TPproxy,
            rulesMessages: TPRulesMessages,
        },
        '1087014898199969873': {
            // EnbyPlace
            sync: [
                '959551566388547676', // TransPlace
                '638480381552754730', // Transonance
            ],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '1255540593451335770',               // EnbyPlace:welcome-verify
                verifyLogs: '1255540709419909140',          // EnbyPlace:verify-logs
                verifyLogsSecondary: '1255540759046787093', // EnbyPlace:verify-kick-logs
                theoSendLogs: '1364039490691268738',        // EnbyPlace:theo-send-logs
                welcome: '1087014899290488870',             // EnbyPlace:welcome-wagon
                general: '1087014899105923122',             // EnbyPlace:rules-info
                introduce: '1087014899290488871',           // EnbyPlace:entrance-hall
            },
            roles: {
                staffRoles: [
                    // [Active]
                    '1087014898418061367', // Admin
                    '1087014898418061365', // Sr Mod
                    '1087014898418061363', // Moderator
                    '1087014898418061362', // Trial Mod
                    '1255540964647370903', // verifier

                    // [On-Leave]
                    '1255541352813301811', // Admin [On-Leave]
                    '1255541421348360324', // Sr Mod [On-Leave]
                    '1255541502877368371', // Moderator [On-Leave]
                    '1255541574851367043', // Trial Mod [On-Leave]
                    '1255541652840255498', // verifier [On-Leave]
                ],
                verifier: '1255540964647370903',
                verified: '1255542090046247004',
                noImages: '1255542151769620501',
                member: '1168300878982295562',
                newbie: '1087014898220929197',
                greeter: '1087014898241896476',
                inactivityPing: '1255542262117568555',
                emojiVoid: '1255542308204711988',
            },
            questions: defaultQuestions,
            links: {
                rules: 'https://canary.discord.com/channels/1087014898199969873/1255540593451335770/1258439336462909492',
                rule1: 'https://canary.discord.com/channels/1087014898199969873/1258432882804785172/1258433967183630500',
                rule2: 'https://canary.discord.com/channels/1087014898199969873/1258432989994680482/1258434025014431786',
                rule3: 'https://canary.discord.com/channels/1087014898199969873/1258433032382058496/1258434063040118855',
                rule5: 'https://canary.discord.com/channels/1087014898199969873/1258433071158395044/1258434101300691084',
                rule7: 'https://canary.discord.com/channels/1087014898199969873/1258433115601502239/1258434279902412843',
                rule9: 'https://canary.discord.com/channels/1087014898199969873/1258433158035013682/1258434309749215334',
                rule12: 'https://canary.discord.com/channels/1087014898199969873/1258433194479583242/1258434330800291930',
            },
            invite: 'https://discord.gg/xt8WqnGffb',
            proxy: TPproxy,
            rulesMessages: TPRulesMessages,
        },
        '638480381552754730': {
            // Transonance
            sync: [
                '959551566388547676', // TransPlace
                '1087014898199969873', // EnbyPlace
            ],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '1255543769835769999',               // Transonance:welcome-verify
                verifyLogs: '1255543882913939527',          // Transonance:verify-logs
                verifyLogsSecondary: '1255543905521238158', // Transonance:verify-kick-logs
                theoSendLogs: '1364039878114807952',        // Transonance:theo-send-logs
                welcome: '1109969065868542062',             // Transonance:welcome-wagon
                general: '1092539304305233941',             // Transonance:rules-info
                introduce: '1108789826351800340',           // Transonance:entrance-hall
            },
            roles: {
                staffRoles: [
                    // [Active]
                    '1109905190372524132', // Admin
                    '1255544133913677834', // Sr Mod
                    '1109942209479970816', // Moderator
                    '1255544257939374141', // Trial Mod
                    '1255544342433632429', // Verifier

                    // [On-Leave]
                    '1255544478303784990', // Admin [On-Leave]
                    '1255544545387745310', // Sr Mod [On-Leave]
                    '1255544622739099670', // Moderator [On-Leave]
                    '1255544693698199633', // Trial Mod [On-Leave]
                    '1255544757954809967', // Verifier [On-Leave]
                ],
                verifier: '1255544342433632429',
                verified: '1109907941454258257',
                noImages: '1255544757510471790',
                member: '1109907352578171001',
                newbie: '1255545076860321822',
                greeter: '1109912498469077252',
                inactivityPing: '1255545148247507016',
                emojiVoid: '1255545384995127423',
            },
            questions: defaultQuestions,
            links: {
                rules: 'https://canary.discord.com/channels/638480381552754730/1255543769835769999/1379578773745434725',
                rule1: 'https://canary.discord.com/channels/638480381552754730/1378842074467794954/1378846359737602151',
                rule2: 'https://canary.discord.com/channels/638480381552754730/1378844409222660126/1378845977842290858',
                rule3: 'https://canary.discord.com/channels/638480381552754730/1378862066320015510/1378862385959272509',
                rule5: 'https://canary.discord.com/channels/638480381552754730/1379266377700872343/1379266503727386699',
                rule6: 'https://canary.discord.com/channels/638480381552754730/1379267116041244844/1379267267896021044',
                rule7: 'https://canary.discord.com/channels/638480381552754730/1379268480083431484/1379269108142444556',
                rule9: 'https://canary.discord.com/channels/638480381552754730/1379294404942102588/1379294558692573277',
                rule12: 'https://canary.discord.com/channels/638480381552754730/1379295048063123486/1379295357514682508',
            },
            invite: 'https://discord.gg/QhTDQsyeD6',
            proxy: TPproxy,
            rulesMessages: TPRulesMessages,
        },
        '1116634030834733077': {
            // TransDice!
            sync: [
                '959551566388547676', // TransPlace
                // Sync here is *intentionally 1-way to TransPlace*, as this is a spin-off server from TransPlace and generally will not be verifying people
            ],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '1342833050731548682',               // TransDice:welcome-verify
                verifyLogs: '1342834458570657794',          // TransDice:verify-logs
                verifyLogsSecondary: '1342835930649595995', // TransDice:verify-kick-logs
                theoSendLogs: '1364104144700309545',        // TransDice:theo-send-logs
            },
            roles: {
                staffRoles: [
                    '1116668288638914641', // Blåholder
                    '1144502144033116201', // TransPlace Staff
                ],
                verifier: '1116668288638914641', // Blåholder
                verified: '1116673143013122068', // Adventurer
            },
            questions: defaultQuestions,
            links: {
                rules: 'https://canary.discord.com/channels/959551566388547676/1057132419150532678/1151892231091925163',
                rule1: 'https://canary.discord.com/channels/959551566388547676/1151689401643053107/1151694186257600522',
                rule2: 'https://canary.discord.com/channels/959551566388547676/1151689483977236610/1151694304037838910',
                rule3: 'https://canary.discord.com/channels/959551566388547676/1151689644052840589/1151694373424218163',
                rule5: 'https://canary.discord.com/channels/959551566388547676/1151689706912882758/1151694425110609941',
                rule7: 'https://canary.discord.com/channels/959551566388547676/1151689903319564329/1151690023331172412',
                rule9: 'https://canary.discord.com/channels/959551566388547676/1151689755537457265/1151694463127793674',
                rule12: 'https://canary.discord.com/channels/959551566388547676/1151689825687195678/1151694529750106186',
            },
            invite: 'https://discord.gg/YUJM2Qg55q',
            proxy: TPproxy,
            rulesMessages: TPRulesMessages,
        },
        '1135300957572431902': {
            // Gender Anarchy
            sync: [],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '1244418752217485364',               // Gender Anarchy:welcome-verify
                verifyLogs: '1244422429468655706',          // Gender Anarchy:verify-logs
                verifyLogsSecondary: '1244422507776446514', // Gender Anarchy:verify-kick-logs
                theoSendLogs: '1364040328298106910',        // Gender Anarchy:theo-send-logs
                welcome: '',
                general: '1135631066871378010',             // Gender Anarchy:rules
                introduce: '1137568440622780507',           // Gender Anarchy:introductions
            },
            roles: {
                staffRoles: [
                    // [Active]
                    '1135440960835309610',  // Administrator
                    '1269753219878490306',  // Senior Moderator
                    '1135428559792508996',  // Moderator
                    '1160658705092714576',  // Trial Moderator
                    '1244425148480749670',  // Verifier

                    // [On-Leave]
                    '1269746464616091651',  // Administrator [On-Leave]
                    '1269746471230771271',  // Senior Moderator [On-Leave]
                    '1269740835633889362',  // Moderator [On-Leave]
                    '1269740831460556901',  // Trial Moderator [On-Leave]
                    '1269740820957757470',  // Verifier [On-Leave]
                ],
                verifier: '1244425148480749670',
                verified: '1135575202709909575',
                noImages: '1204541395726106686',
                place: '',
                member: '1198798476813811712',
                newbie: '',
                greeter: '',
                inactivityPing: '1244425552010678313',
                emojiVoid: '',
            },
            questions: defaultQuestions,
            links: {
                rules: 'https://discord.com/channels/1135300957572431902/1244418752217485364/1423702859312140418',
                rule1: 'https://discord.com/channels/1135300957572431902/1246846234023428146',
                rule6: 'https://discord.com/channels/1135300957572431902/1246846166822551563',
                rule8: 'https://discord.com/channels/1135300957572431902/1246846100933968045',
                rule16: 'https://discord.com/channels/1135300957572431902/1246846037872738435',
                rule17: 'https://discord.com/channels/1135300957572431902/1246845980779872498',
                rule18: 'https://discord.com/channels/1135300957572431902/1246845823950655498',
            },
            invite: 'https://discord.gg/GenderAnarchy',
            proxy: GAproxy,
            rulesMessages: GARulesMessages,
        },
        '928175231091236884': {
            // Café de la Femme
            sync: [],
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '1275115292644606005',               // CDLF:cdlf-welcome-verify
                verifyLogs: '1275115394021195816',          // CDLF:verify-logs
                verifyLogsSecondary: '1275115440753872916', // CDLF:verify-kick-logs
                theoSendLogs: '1381052245319225425',        // CDLF:theo-send-logs
                welcome: '1275116015466057748',             // CDLF:welcome-wagon
                general: '928177646502805534',              // CDLF:rules
                introduce: '949463502798614588',            // CDLF:introduce-yourself
            },
            roles: {
                staffRoles: [
                    // [Active]
                    '928181806774243358',   // Barista [Admin]
                    '963914918132846622',   // Hostess [Mod]
                    '949509841980903434',   // Cashier [Mini Mod]
                    '1273080176892313713',  // Bouncer [Verifier]

                    // [On-Leave]
                    '1297610758925844510',  // Barista [Admin Off-Duty]
                    '1297611101382381589',  // Host/ess [Mod Off-Duty]
                    '1297611290700939274',  // Cashier [Mini Mod Off-Duty]
                    '1297611413543452692',  // Bouncer [Verifier Off-Duty]
                ],
                verifier: '1273080176892313713',
                verified: '949441336417853520',
                noImages: '1275118018526973982',
                place: '',
                member: '1275122654088527915',
                newbie: '',
                greeter: '1296977654192537650',
                inactivityPing: '1275124169016606792',
                emojiVoid: '1275124294749392906',
            },
            questions: cdlfQuestions,
            links: {
                rules: 'https://discord.com/channels/928175231091236884/1275115292644606005/1428095364333965484',
            },
            invite: 'https://discord.gg/CafeDeLaFemme',
            proxy: CDLFproxy,
            rulesMessages: CDLFRulesMessages,
        },
    },
};

if (process.env.NODE_ENV === 'development') {
    Object.assign(config, development);
} else if (process.env.NODE_ENV === 'production') {
    Object.assign(config, production);
} else {
    throw new FatalError(
        'Invalid value for environmental variable NODE_ENV: Must be either \'development\' or \'production\'',
    );
}

export default config;
