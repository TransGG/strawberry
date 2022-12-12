import { time as timestamp, TimestampStyles } from 'discord.js';

/**
 * Builds a string that contains information with a comparison between two times that will look
 * something like '<timestamp> (... days, ... hours old)'
 * @param {Date|number} time The time being compared
 * @param {Date|number} now The time to compare to to determine elapsed time since time
 * @returns {string} A string with a comparison between two times
 */
function buildTimeInfoString(time) {
    // coerce parameters into dates
    const timeDate = time instanceof Date ? time : new Date(time);

    return `${timestamp(timeDate, TimestampStyles.LongDateTime)} (${timestamp(timeDate, TimestampStyles.RelativeTime)})`;
}

export default buildTimeInfoString;
