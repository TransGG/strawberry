/**
 * Parent class all Interactions. Subclasses should have a run() function, which is called when
 * the command is ran
 */
 class Interaction {
    /**
     * Constructor for class Interaction
     * 
     * @param {Client} client The Discord client
     * @param {string} name The name of the interaction
     */
    constructor(client, name) {
        this.client = client
        this.name = name
    }
}

export default Interaction