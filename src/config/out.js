import config from './config.js';

function debug(...args) {
    if (config.debug) {
        config.debugOut(...args);
    }
}

function verbose(...args) {
    if (config.verbose) {
        config.verboseOut(...args);
    }
}

export { debug, verbose };
