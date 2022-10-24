import { DataError } from '../utils/errors.js';

/**
 * Parent class all interaction handlers. All subclasses should pass a name unique to the type of subclass and implement
 * run() and getData().
 */
class Interaction {
    name;

    /**
     * @param {string} name The name of the interaction
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Returns data that describe the format of the interaction in some way. Subclasses should implement getData() and
     * if they don't, this function will run and throw an error
     * @throws {DataError} This function must be implemented in subclasses
     */
    getData() {
        throw new DataError(
            'Tried to load data but data were not found! (psst: getData() is probably not implemented)',
            this.name,
        );
    }

    /**
     * Serializes this component to an API-compatible JSON object. Useful so you can pass a SelectMenu directly to
     * ActionRowBuilder().addComponents()
     * @returns {APIButtonComponent} The data of this button in JSON
     */
    toJSON() {
        return this.getData().toJSON();
    }
}

export default Interaction;
