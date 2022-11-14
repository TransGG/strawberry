/**
 * Parent class for events. Subclasses should have a run function, which is called when the event is
 * triggered.
 */
class Event {
    client;

    name;

    #listener;

    /**
     * @param {Client} client The Discord Client
     * @param {string} name The name of the event
     */
    constructor(client, name) {
        this.client = client;
        this.name = name;
        this.#listener = this.#run.bind(this);
    }

    /**
     * Run the run function (should be implemented in subclasses) with given arguments as well as
     * catch and log errors.
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
     * Adds this this instance's listener function to the listener array of this.client for the
     * event named this.name
     */
    startListener() {
        this.client.on(this.name, this.#listener);
    }

    /**
     * Adds a one-time listener function to this.client for the event named this.name. The next time
     * the event is triggered, the client removes and then invokes this listener.
     */
    listenOnce() {
        this.client.once(this.name, this.#listener);
    }

    /**
     * Removes this instance's listener from this.client's listener array for the event named
     * this.name.
     */
    stopListener() {
        this.client.off(this.name, this.#listener);
    }
}

export default Event;
