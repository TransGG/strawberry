import config from '../config/config.js';

/**
 * Builds questions for verification prompt, altering the question list based on the id passed
 * @param {string} guildId ID of the guild
 * @param {string} id ID of option, should match an option from prompt select select menu
 * @returns {string[]} An array of formatted questions
 */
function formatQuestions(guildId, categoryId) {
    return config.guilds[guildId]
        ?.questions
        ?.find((questionObject) => questionObject.id === categoryId)
        ?.questions
        ?.map((questionText, index) => `${index + 1}. ${questionText}`)
        ?.concat(['> Please answer these questions by sending a message in this thread.'])
        ?? [`Failed to fetch questions !! guild = ${guildId}, id = ${categoryId}`];
}

/**
 * Builds options for the pre-verification question select select menu
 * @param {string} guildId ID of the guild
 * @returns {APISelectMenuOption[]} Options for a select menu
 */
function buildOptions(guildId) {
    return config.guilds[guildId]
        ?.questions
        ?.map((questionObject) => ({
            label: questionObject.title,
            description: questionObject.description,
            value: questionObject.id,
        })) ?? [];
}

export {
    formatQuestions,
    buildOptions,
};
