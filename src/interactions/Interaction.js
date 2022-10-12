/**
 * Parent class all Interactions. Subclasses should have a run() function, which is called when
 * the command is ran
 */
class Interaction {
    name;

    /**
     * Constructor for class Interaction
     * @param {string} name The name of the interaction
     */
    constructor(name) {
        this.name = name;
    }
}

export default Interaction;
