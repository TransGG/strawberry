import { ChannelType, ThreadAutoArchiveDuration } from 'discord.js';
import 'dotenv/config';
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
 * @property {Snowflake} channels.rules               - Rules channel
 * @property {Snowflake} channels.roles               - Get roles channel
 * @property {Snowflake} channels.introduce           - Channel for self-introductions
 * @property {Object}    roles      - Relevant roles
 * @property {Snowflake} roles.verifier               - Verifier: the chief agents of the verification process
 * @property {Snowflake} roles.verified               - Verified: the role that is awarded to people who get verified
 * @property {Snowflake} roles.greeter                - Greeter: role to be notified of new members
 */
const config = {
    debug: false,
    verbose: false,
    debugOut: () => { },
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
        rules: '',
        roles: '',
        introduce: '',
    },
    roles: {
        verifier: '',
        verified: '',
        greeter: '',
    },

};

const development = {
    debugOut: console.debug,
    verboseOut: console.info,
    clientId: '999892254808350811', // elsie
    verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
    privateThread: ChannelType.PublicThread, // test server does not have server premium level for private threads
    guild: '987229949041725520', // ets
    channels: {
        lobby: '987230161764225044', // test
        verifyLogs: '1023658079675498568', // test 2
        verifyLogsSecondary: '1024037750116204675', // test 3
        welcome: '1023658079675498568', // test 2
        rules: '987230161764225044', // test
        roles: '987230161764225044',
        introduce: '987230161764225044',
    },
    roles: {
        verifier: '1001630620629344347', // new role
        verified: '1016584910590459904', // test role
        greeter: '1023671868609269811', // elise
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
        lobby: '987358841245151262',                // transplace:welcome-verify
        verifyLogs: '987377031434100747',           // transplace:verify-logs
        verifyLogsSecondary: '1025521840816402442', // transplace:verify-kick-logs
        welcome: '978883070662959134',              // transplace:welcome-wagon
        rules: '964333907447250975',                // transplace:rules-info
        roles: '964279302877241375',                // transplace:self-roles
        introduce: '964221571071869050',            // transplace:entrance-hall
    },
    roles: {
        verifier: '959916105294569503',
        verified: '959748411844874240',
        greeter: '978861945253945394',
    },

};

if (process.env.NODE_ENV === 'development') {
    Object.assign(config, development);
} else if (process.env.NODE_ENV === 'production') {
    Object.assign(config, production);
} else {
    throw new FatalError('Invalid value for environmental variable NODE_ENV! Must be either \'development\' or \'production\'!');
}

export default config;
