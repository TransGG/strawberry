import { ChannelType, ThreadAutoArchiveDuration } from 'discord.js';
import 'dotenv/config';
import { FatalError } from '../bot/utils/errors.js';
import {
    GAmentalHealthEmbed,
    GArulesEmbed1,
    GArulesEmbed2,
    notesReportEmbed,
} from './embeds.js';

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
 * @property {Object}    guild.roles.catagories   - Relevant role catagories
 * @property {Snowflake} guild.roles.catagories.isTrans       - Trans: role for trans people
 * @property {Snowflake} guild.roles.catagories.isQuestioning - Questioning: role for trans questioning people
 * @property {Snowflake} guild.roles.catagories.isCis         - Cis: role for cisgender people
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

const GAproxy = {
    name: 'Verification Caitlyn Proxy',
    displayName: 'Caitlyn ♡ [She/Her]',
    avatarURL: 'https://i.imgur.com/fOJFzGz.png',
    heartEmoji: '<:GayHeart:1135714747803783269>',
    welcomeEmoji: '<:DemonThumbsup:1147951767682818201>',
    thanksEmoji: '<:DemonCelebrate:1147951774683119676>',
    bumpEmoji: '<:DemonFire:1147951717888041001>',
};

const GArulesMessages = [
    [GArulesEmbed1, GArulesEmbed2],
    [notesReportEmbed, GAmentalHealthEmbed],
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
                catagories: {},
            },
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
            rulesMessages: GArulesMessages,
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
                catagories: {
                    isTrans: '1255575077865525258',
                    isQuestioning: '1255575092847443988',
                    isCis: '1255575108601249815',
                },
            },
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
            proxy: GAproxy,
            rulesMessages: GArulesMessages,
        },
    },
};

const production = {
    debugOut: () => {},
    verboseOut: () => {},
    clientId: '1244421306598822024', // theo
    guilds: {
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
                catagories: {
                    isTrans: [
                        '1135590332021624854', // Trans
                        '1135590440310145054', // Transfem
                        '1135590493791731722', // Transmasc
                        '1135590532320595988', // Nonbinary
                        '1149046767783006279', // Agender
                        '1152386445332459540', // Pangender
                        '1150941011250516058', // Genderfluid
                        '1211388591725346927', // Two Spirited
                        '1152386602836951083', // Demiboy
                        '1152386528979464213', // Demigrl
                        '1152386678086979655', // Demiqueer
                    ],
                    isQuestioning: [
                        '1146451104763228182', // Questioning
                    ],
                    isCis: [
                        '1135590367148908625', // Cis
                        '1135590615095189625', // Queer
                        '1135590584468385792', // Unlabeled
                    ],
                },
            },
            links: {
                rules: 'https://discord.com/channels/1135300957572431902/1244418752217485364/1356767824328134727',
                rule1: 'https://discord.com/channels/1135300957572431902/1246846234023428146',
                rule6: 'https://discord.com/channels/1135300957572431902/1246846166822551563',
                rule8: 'https://discord.com/channels/1135300957572431902/1246846100933968045',
                rule16: 'https://discord.com/channels/1135300957572431902/1246846037872738435',
                rule17: 'https://discord.com/channels/1135300957572431902/1246845980779872498',
                rule18: 'https://discord.com/channels/1135300957572431902/1246845823950655498',
            },
            invite: 'https://discord.gg/GenderAnarchy',
            proxy: GAproxy,
            rulesMessages: GArulesMessages,
        },
    },
};

if (process.env.NODE_ENV === 'development') {
    Object.assign(config, development);
} else if (process.env.NODE_ENV === 'production') {
    Object.assign(config, production);
} else {
    throw new FatalError(
        'Invalid value for environmental variable NODE_ENV: Must be either "development" or "production".',
    );
}

export default config;
