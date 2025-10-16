import config from '../config/config.js';

/**
 * Builds questions for verification prompt, altering the question list based on the id passed
 * @param {string} guild ID of the guild
 * @param {string} id ID of option, should match an option from prompt select select menu
 * @returns {string[]} An array of formatted questions
 */
function formatQuestions(guild, id) {
    return config.guilds[guild]
        ?.questions
        ?.find((questionObject) => questionObject.id === id)
        ?.questions
        ?.map((questionText, index) => `${index + 1}. ${questionText}`)
        ?.concat(['> Please answer these questions by sending a message in this thread.'])
        ?? [`Failed to fetch questions !! guild = ${guild}, id = ${id}`];
}

/**
 * Builds options for the pre-verification question select select menu
 * @param {string} guild ID of the guild
 * @returns {APISelectMenuOption[]} Options for a select menu
 */
function buildOptions(guild) {
    return config.guilds[guild]
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
