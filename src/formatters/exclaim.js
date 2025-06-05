/**
 * Appends an exclamation mark to a string if it does not end with one already.
 * @param {string} name The string to potentially modify
 * @returns {string} The potentially modified string
 */
function exclaim(name) {
    return name.endsWith('!') ? name : `${name}!`;
}

export default exclaim;
