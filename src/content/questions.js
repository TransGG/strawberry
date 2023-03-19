const always = [
    'Do you agree to the server rules / Discord Community Guidelines & Discord ToS?',
    'What name would you like to be referred as (Doesn\'t need to be your legal name)',
    'What are your pronouns?',
    'What is your favorite rule?',
];

const questionsObjects = [
    {
        select: 'Transgender / Genderfluid / Non-Binary',
        id: 'isTrans',
        questions: ['What made you discover you were Transgender / Genderfluid / Non-Binary'],
    },
    {
        select: 'Cisgender / Other LGBTQ+',
        id: 'isCis',
        questions: [
            'Why did you decide to join a trans server instead of any general LGTBQ+ server?',
            'What would be an example of invalidating someone\'s identity?',
            'Do you identify as a member of the LGBTQ+ community? If so, where do you identify? (Bi/pan/ace/aro/etc.)',
        ],
    },
];

const postscripts = [
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
        .concat(postscripts.map((postscript) => `# ${postscript}`));
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
