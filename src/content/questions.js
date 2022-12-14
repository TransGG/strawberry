const always = [
    'Do you agree to the server rule / Discord Community Guidelines & Discord ToS?',
    'What name would you like to be referred as (Dosen\'t need to be your legal name)',
    'What are your pronouns?',
    'What is your favorite rule?',
];

const questionsObject = [{
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

function buildQuestions(id) {
    const question = questionsObject.find((q) => q.id === id);
    if (question) {
        return [...always, ...question.questions].map((q, i) => `${i + 1}. ${q}`);
    }
    return always.map((q, i) => `${i + 1}. ${q}`);
}

function buildOptions() {
    return questionsObject.map((q) => ({
        label: q.select,
        description: `Do you identify as ${q.select}`,
        value: q.id,
    }));
}

const questions = {
    always,
    questionsObject,
};

export {
    questions,
    buildQuestions,
    buildOptions,
};
