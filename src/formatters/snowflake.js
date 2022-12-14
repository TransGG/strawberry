/**
 * Tests if a string is a Discord snowflake
 * @param {string} string The string to test
 * @returns {boolean} True if the string is a snowflake, false otherwise
 */
function isSnowflake(string) {
    return typeof string === 'string' && /\d{17,20}/.test(string);
}

/**
 * Matches snowflakes (the numbers Discord uses for id's) that appear at the very end of the string
 * @param {string} string The string to match
 * @returns {?string[]} An Array that contains a matching string and has extra properties from
 * RegExp.exec, or null if no matches are found.
 */
function matchTrailingSnowflake(string) {
    return /\d{17,20}$/.exec(string);
    //                   |  |     |__ end of line
    //                   |  |__ 17-20 digits: long story short it's the conceivable valid snowflake
    //                   |      range
    //                   |__ digit (i.e. [0-9])
}

export {
    isSnowflake,
    matchTrailingSnowflake,
};
