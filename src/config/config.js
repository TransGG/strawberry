import 'dotenv/config';
import { FatalError } from '../utils/errors.js';

// for easier reading
/* eslint-disable max-len */
/**
 * @property {boolean}   debug      - Whether debug mode is enabled
 * @property {boolean}   verbose    - Whether verbose output is enabled
 * @property {function}  debugOut   - Function to be called for debug output
 * @property {function}  verboseOut - Function to be called for verbose output
 * @property {Snowflake} clientId   - The id of the bot to which application commands are registered, in the form of a Discord Snowflake
 * @property {string}    token      - The token of the bot
 */
const config = {
    debug: false,
    verbose: false,
    debugOut: () => { },
    verboseOut: () => { },
    clientId: '999892254808350811',
    token: process.env.TOKEN,
};

const development = {
    debugOut: console.debug,
    verboseOut: console.info,
};

const production = {
    debugOut: () => { },
    verboseOut: () => { },
};

if (process.env.NODE_ENV === 'development') {
    Object.assign(config, development);
} else if (process.env.NODE_ENV === 'production') {
    Object.assign(config, production);
} else {
    throw new FatalError('Invalid value for environmental variable NODE_ENV! Must be either \'development\' or \'production\'!');
}

export default config;
