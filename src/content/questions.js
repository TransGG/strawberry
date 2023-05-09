const always = [
    'What is your favorite rule from our server rules?',
];

const questionsObjects = [
    {
        select: 'Transgender / Genderfluid / Non-Binary',
        id: 'isTrans',
        questions: [
            'What do E and T mean in trans contexts?',
            'What does the word Transgender mean to you?',
            'How did you figure out your gender identity?',
        ],
    },
    {
        select: 'Transgender Questioning',
        id: 'isQuestioning',
        questions: [
            'If you could change three things about yourself right now, what would they be?',
            'What does the word Transgender mean to you?',
            'What made you begin questioning your gender identity?',
        ],
    },
    {
        select: 'Cisgender / Other LGBTQ+',
        id: 'isCis',
        questions: [
            'What about this server being trans-focused made you want to join',
            'What would you do as/being an ally in this server',
            'What does the word Transgender mean to you?',
        ],
    },
];

const postscripts = [
    'Please answer these questions by sending a message in this thread',
];

/**
 * Builds questions for verification prompt, altering the question list based on the id passed
 * @param {string} id Id of option, should match an option from prompt select select menu
 * @returns {string[]} An array of formatted questions
 */
function formatQuestions(id) {
    let questions = always;

    const questionsForId = (
        questionsObjects.find((questionObject) => questionObject.id === id).questions
    );
    if (questionsForId) {
        questions = questions.concat(questionsForId);
    }

    return questions
        .map((questionText, index) => `${index + 1}. ${questionText}`)
        .concat(postscripts.map((postscript) => `> ${postscript}`));
}

/**
 * Builds options for the pre-verification question select select menu
 * @returns {APISelectMenuOption[]} Options for a select menu
 */
function buildOptions() {
    return questionsObjects.map((questionObj) => ({
        label: questionObj.select,
        description: `Do you identify as ${questionObj.select}`,
        value: questionObj.id,
    }));
}

export {
    formatQuestions,
    buildOptions,
};
