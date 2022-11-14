// this file is to store various error classes
/* eslint-disable max-classes-per-file */

class LookupError extends Error {
    query;

    source;

    /**
     * Exception to be thrown when a query had no result or an improper result
     * @param {string} type The type of result that was being searched for
     * @param {string} query The query that was not found
     * @param {Array} source Where the query was searching
     */
    constructor(type, query, source) {
        super(`Tried to lookup ${type} with query '${query}' but it was not found!`);
        this.source = source;
    }
}

class CommandChildNotFound extends Error {
    /**
     * Exception to be thrown when a subcommand or subcommand group of a slash command is looked up
     * but it was not found. Displays the command as well as, if given, the subcommand and
     * subcommand group. If you may want to pass the subcommand as well as the subcommand group but
     * the group was the property whose lookup failed, that is what info.isGroupTheMissingOne is
     * for.
     * @param {string} command The name of the command whose running caused this exception
     * @param {Object} info The details of the failed command
     * @param {string} [info.group] The name of the subcommand group of the command
     * @param {string} [info.subcommand] The name of the subcommand group of the command
     * @param {boolean} [info.isGroupTheMissingOne=false] Will make the error display the group if
     *     the subcommand exists. Useful for when you want to pass both the subcommand group and
     *     subcommand and the group was the missing element.
     */
    constructor(command, { group, subcommand, isGroupTheMissingOne = false }) {
        // pad the names for proper spaces in message
        const groupStr = group ? ` ${group}` : '';
        const subcommandStr = subcommand ? ` ${subcommand}` : '';

        const message = `Tried to lookup '/${command}${groupStr}${subcommandStr}' but ${subcommand && !isGroupTheMissingOne ? `subcommand '${subcommand}'` : `group '${group}'`} was not found.`;

        super(message);
    }
}

class DuplicateElement extends Error {
    constructor(path, name, collection) {
        const keys = collection.map((value, key) => key);
        super(`Found duplicate while loading files: ${name} found at ${path}! Existing keys of collection: ${keys}`);
    }
}

class DataError extends Error {
    instance;

    instanceName;

    constructor(message, instance) {
        super(message);
        this.instance = instance;
    }
}

class FatalError extends Error {

}

export {
    LookupError,
    CommandChildNotFound,
    DuplicateElement,
    DataError,
    FatalError,
};
