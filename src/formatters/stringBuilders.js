import { time as timestamp, TimestampStyles } from 'discord.js';

const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60;

/**
 * Builds a string that contains information with a comparison between two times that will look
 * something like '<timestamp> (... days, ... hours old)'
 * @param {Date|number} time The time being compared
 * @param {Date|number} now The time to compare to to determine elapsed time since time
 * @returns {string} A string with a comparison between two times
 */
function buildTimeInfoString(time, now = new Date()) {
    // coerce parameters into dates
    const timeDate = time instanceof Date ? time : new Date(time);
    const nowDate = now instanceof Date ? now : new Date(now);
    const diff = nowDate - timeDate;

    return `${timestamp(timeDate, TimestampStyles.LongDateTime)} (${Math.floor(diff / oneDay)} days, ${Math.floor(diff / oneHour)} hours old)`;
}

export default buildTimeInfoString;
