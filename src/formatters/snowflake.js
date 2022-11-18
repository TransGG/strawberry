/**
 * Matches snowflakes (the numbers Discord uses for id's)
 * @param {string} string The string to match
 * @returns {string[]}
 */
function matchSnowflakes(string) {
    return string.match(/\d{17,20}$/);
    //                   |  |     |__ end of line
    //                   |  |__ 17-20 digits: long story short it's the conceivable valid snowflake
    //                   |      range
    //                   |__ digit (i.e. [0-9])
}

export {
    // eslint-disable-next-line import/prefer-default-export
    matchSnowflakes,
};
