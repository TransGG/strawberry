import { DataError } from '../utils/errors.js';

/**
 * Parent class all Interactions. Subclasses should have a run() function, which is called when
 * the command is ran
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
}

export default Interaction;
