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
 * @property {Object}    channels   - Relevant channels
 * @property {Snowflake} channels.lobby               - The channel unverified users start verification from
 * @property {Snowflake} channels.verifyLogs          - Main log channel for verification logs
 * @property {Snowflake} channels.verifyLogsSecondary - Secondary log channel for verification logs. Currently used for verify kick logs
 * @property {Snowflake} channels.welcome             - Secondary log channel for verification logs. Currently used for verify kick logs
 * @property {Snowflake} channels.general             - General channel
 * @property {Snowflake} channels.introduce           - Channel for self-introductions
 * @property {Object}    roles   - Relevant roles
 * @property {Snowflake} roles.verifier - Verifier: the chief agents of the verification process
 * @property {Snowflake} roles.verified - Verified: the role that is awarded to people who get verified
 * @property {Snowflake} roles.greeter  - Greeter: role to be notified of new members
 * @property {Object}    roles.catagories   - Relevant role catagories
 * @property {Snowflake} roles.catagories.isTrans       - Trans: role for trans people
 * @property {Snowflake} roles.catagories.isQuestioning - Questioning: role for trans questioning people
 * @property {Snowflake} roles.catagories.isCis         - Cis: role for cisgender people
 */
const config = {
    verboseOut: () => { },
    clientId: '',
    token: process.env.TOKEN,
    verifyTicketAutoArchiveDuration: 0,
    privateThread: ChannelType.PublicThread,
    guild: '',
    channels: {
        lobby: '',
        verifyLogs: '',
        verifyLogsSecondary: '',
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

};

const development = {
    debugOut: console.debug,
    verboseOut: console.info,
    clientId: '999892254808350811', // elsie
    verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
    privateThread: ChannelType.PrivateThread,
    guild: '987229949041725520', // ets
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
};

const devServ = {
    debugOut: console.debug,
    verboseOut: console.info,
    clientId: '1044280585897640006',
    verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
    privateThread: ChannelType.PrivateThread,
    guild: '987229949041725520',
    channels: {
        lobby: '1097203594631073933',
        verifyLogs: '1097203635689107516',
        verifyLogsSecondary: '1097203656551583865',
        welcome: '1097203677468561541',
        general: '1097203694539387111',
        introduce: '1097203721802354868',
    },
    roles: {
        staffRoles: [
            '986220638958137355',
        ],
        verifier: '1046271388782186590',
        verified: '1092270181012742144',
        no_images: '1121664177333878844',
        place: '1121666104390058115',
        member: '1105354354501881866',
        greeter: '1097204070252548097',
        inactivityPing: '1046271388782186590',
        emojiVoid: '1100125547297783858',
        catagories: {
            isTrans: '1105354251909206078',
            isQuestioning: '1105354300756086794',
            isCis: '1105354278111019048',
        },
    },
};

const production = {
    debugOut: () => { },
    verboseOut: () => { },
    clientId: '964615352489222225', // theo
    verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
    privateThread: ChannelType.PrivateThread, // test server does not have server premium level for private threads
    guild: '959551566388547676', // transplace
    channels: {
        lobby: '1057132419150532678',                // transplace:welcome-verify
        verifyLogs: '987377031434100747',           // transplace:verify-logs
        verifyLogsSecondary: '1025521840816402442', // transplace:verify-kick-logs
        welcome: '978883070662959134',              // transplace:welcome-wagon
        general: '960920453705257061',                // transplace:rules-info
        introduce: '964221571071869050',            // transplace:entrance-hall
    },
    roles: {
        staffRoles: [
            '981735525784358962',  // admin
            '959916105294569503',  // verifier
            '981735650971775077',  // moderator
            '961350385556152370',  // minecraft mod
            '995822941663154206',  // admin on leave
            '1046488017151463586', // sr. mod on leave
            '996798409061171221',  // verifier on leave
            '996798320649457667',  // mod on leave
            '1046488385973399704', // minecraft admin on leave
            '1046488495138537543', // minecraft mod on leave
        ],
        verifier: '959916105294569503',
        verified: '959748411844874240',
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

};

if (process.env.NODE_ENV === 'development') {
    Object.assign(config, development);
} else if (process.env.NODE_ENV === 'devServ') {
    Object.assign(config, devServ);
} else if (process.env.NODE_ENV === 'production') {
    Object.assign(config, production);
} else {
    throw new FatalError('Invalid value for environmental variable NODE_ENV: Must be either \'development\' or \'production\'');
}

export default config;
