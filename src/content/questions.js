const always = [
    'Do you agree to the server rules / Discord Community Guidelines & Discord ToS?',
    'What name would you like to be referred to as?',
    'What are your pronouns?',
    'What is your favorite rule from our server rules?',
];

const questionsObjects = [
    {
        select: 'Transgender / Genderfluid / Non-Binary',
        id: 'isTrans',
        questions: [
            'How did you figure out your gender identity?',
            'What makes you the happiest about being your gender?',
        ],
    },
    {
        select: 'Cisgender / Other LGBTQ+',
        id: 'isCis',
        questions: [
            'What made you want to be part of this trans-focused community above a general or LGBTQ+ one?',
            'What would you do to be an ally in this community?',
            'Do you identify as a member of the LGBTQ+ community? If so, what? (Bi/pan/ace/aro/etc.)',
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
