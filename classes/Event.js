/**
 * Parent class for events. Subclasses should have a run function, which is called when the event is triggered.
 */
class Event {
    // fields
    client;

    name;

    #listener;

    /**
     * Constructor for class Event
     * @param {Client} client The Discord Client
     * @param {string} name The name of the event
     */
    constructor(client, name) {
        this.client = client;
        this.name = name;
        this.#listener = this.#run.bind(this);
    }

    /**
     * Run the run function (should be implemented in subclasses) with given arguments as well as catch and log errors.
     * @param  {...any} args The arguments of the event
     */
    async #run(...args) {
        try {
            await this.run(...args);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Call client.on for the event with the name of this Event and if that event name does have a trigger, call the
     * #listener function specified in the constructor
     */
    startListener() {
        this.client.on(this.name, this.#listener);
    }

    /**
     * Same as startListener(), but with client.off
     */
    stopListener() {
        this.client.off(this.name, this.#listener);
    }
}

export default Event;
