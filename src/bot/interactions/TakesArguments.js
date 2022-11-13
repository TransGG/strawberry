import Interaction from './Interaction.js';

const delim = '|';

/**
 * A class that has a need to store arguments to be parsed later.
 */
class TakesArguments extends Interaction {
    /**
     * Joins the arguments together with a delimiter
     * @param  {...any} args The elements to join
     * @returns {string} The arguments joined with the delimiter
     */
    static delimit(...args) {
        return args.join(delim);
    }

    /**
     * Tokenizes a delimited string
     * @param {string} string A delimited string
     * @returns {Array<string>} An array containing each token
     */
    static tokenize(string) {
        return string.split(delim);
    }

    /**
     * Adds arguments to a builder
     * @param {ComponentBuilder|ModalBuilder} builder The builder to add arguments to
     * @param  {...any} args The arguments to add
     * @returns {ComponentBuilder|ModalBuilder} The builder with the arguments added
     */
    static addArgs(builder, ...args) {
        return builder.setCustomId(TakesArguments.delimit(builder.data.custom_id, ...args));
    }

    /**
     * Creates a version of this instance's data with arguments added in.
     * @param  {...any} args Arguments to add on to the data
     * @returns The data with the arguments added in
     */
    addArgs(...args) {
        return TakesArguments.addArgs(this.getData(), ...args);
    }
}

export default TakesArguments;
