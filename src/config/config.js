import 'dotenv/config';

// for easier reading
/* eslint-disable max-len */
/**
 * @property {boolean}   debug    - Whether debug mode is enabled
 * @property {boolean}   verbose  - Whether verbose output is enabled
 * @property {Snowflake} clientId - The id of the bot to which application commands are registered, in the form of a Discord Snowflake
 * @property {string}    token    - The token of the bot
 */
const config = {
    debug: false,
    verbose: false,
    clientId: '999892254808350811',
    token: process.env.TOKEN,
};

export default config;
