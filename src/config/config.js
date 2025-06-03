import 'dotenv/config';
import { ChannelType, ThreadAutoArchiveDuration } from 'discord.js';
import { FatalError } from '../bot/utils/errors.js';

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
 */
const config = {
    verboseOut: () => { },
    clientId: '',
    token: process.env.TOKEN,
    guilds: {
        '': {
            verifyTicketAutoArchiveDuration: 0,
            privateThread: ChannelType.PublicThread,
            channels: {
                lobby: '',
                verifyLogs: '',
                verifyLogsSecondary: '',
                theoSendLogs: '',
                welcome: '',
                general: '',
                introduce: '',
            },
            roles: {
                staffRoles: [],
                verifier: '',
                verified: '',
                member: '',
                greeter: '',
                catagories: {
                    isTrans: '',
                    isQuestioning: '',
                    isCis: '',
                },
            },
        },
    },
};

const development = {
    debugOut: console.debug,
    verboseOut: console.info,
    clientId: '999892254808350811', // elsie
    guilds: {
        '987229949041725520': {
            verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
            privateThread: ChannelType.PrivateThread,
            channels: {
                lobby: '987230161764225044', // test
                verifyLogs: '1023658079675498568', // test 2
                verifyLogsSecondary: '1024037750116204675', // test 3
                welcome: '1023658079675498568', // test 2
                general: '987230161764225044', // test
                introduce: '987230161764225044',
            },
            roles: {
                staffRoles: [
                    '1023671868609269811', // elise
                ],
                verifier: '1046271388782186590', // new role
                verified: '1016584910590459904', // test role
                greeter: '1023671868609269811', // elise
            },
        },
    },
};

const devs = {
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
                catagories: {
                    isTrans: '1105349250335907870',
                    isQuestioning: '1105349324688338964',
                    isCis: '1105349438953762837',
                },
            },
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
            invite: 'https://discord.gg/TransPlace',
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
                catagories: {
                    isTrans: '1168292211461472267',
                    isQuestioning: '1168292329900212326',
                    isCis: '1168292229283061760',
                },
            },
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
                catagories: {
                    isTrans: '1109912826866323607',
                    isQuestioning: '1109912874459078867',
                    isCis: '1109912938929737909',
                },
            links:  {
                rules: 'https://canary.discord.com/channels/959551566388547676/1057132419150532678/1151892231091925163',
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
                catagories: {},
            },
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
        },
    },
};

if (process.env.NODE_ENV === 'development') {
    Object.assign(config, development);
} else if (process.env.NODE_ENV === 'devs') {
    Object.assign(config, devs);
} else if (process.env.NODE_ENV === 'production') {
    Object.assign(config, production);
} else {
    throw new FatalError(
        'Invalid value for environmental variable NODE_ENV: Must be either \'development\' or \'production\'',
    );
}

export default config;
