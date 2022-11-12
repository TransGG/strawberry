import Interaction from './Interaction.js';

const delim = '|';

/**
 * A class that has a need to store arguments to be parsed later.
 */
class TakesArguments extends Interaction {
    /**
     * Creates a version of the data with arguments added in.
     * @param  {...any} args Arguments to add on to the data
     * @returns The data with the arguments added in
     */
    args(...args) {
        const data = this.getData();

        // check if data has a function called setCustomId
        if (!(typeof data.setCustomId === 'function')) {
            throw Object.assign(
                new TypeError('Expected data of TakesArguments to have function setCustomId but it was not present!'),
                { data, instance: this },
            );
        }

        data.setCustomId(`${data.data.custom_id}${delim}${args.join(delim)}`);
        return data;
    }

    /**
     * Parses a custom id that has had arguments added into an array containing the base custom id as the first element
     * then all the arguments as the subsequent elements, if any.
     * @param {string} string A custom id with arguments.
     * @returns {Array<string>} An array containing the base custom id first, then the arguments, if any.
     */
    static parse(string) {
        return string.split(delim);
    }
}

export default TakesArguments;
