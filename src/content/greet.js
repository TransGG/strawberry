import {
    bold,
    channelMention,
    EmbedBuilder,
    italic,
    roleMention,
    userMention,
} from 'discord.js';
import config from '../config/config.js';

// TODO: read these from a file

const greeterMessages = [
    'say hello to you new best friend {user}!',
    'everyone wake up {user} joined!',
    "don't get too surprised but... {user} is here!",
    'your wish came true! {user} was verified!',
];

const imageUrls = [
    'https://cdn.discordapp.com/attachments/960315252044603413/978873384425369700/Dutch.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873384790261780/Esperanto.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873385025175602/Filipino.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873385264234507/French.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873385553645608/German.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873385872404571/Greek.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873386107281418/Korean.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873386354761779/Russian.png',
    'https://cdn.discordapp.com/attachments/960315252044603413/978873386598023188/Spanish.png',
];

const emojis = [
    '❤️',
    ':magic_wand:', // these aren't rendering on windows so I'll leave it like that
    ':people_hugging:',
    '🐬',
    '🎊',
    '🎉',
    '📌',
    '📈',
    '✨',
    '⛳',
];

const facts = [
    'Some potatoes are poisonous.',
    "Most dirt isn't edible.",
    'Walls are often made with bricks, but clay can also be used.',
    'Mixing apple juice and Toothpaste would most likely taste bad.',
    'Soup cans are often repurposed to create homes for small animals such as rats.',
    'Some humans have been able to learn the language spoken by orange species of fish.',
    "Pluto's surface contains plutonium, which tastes like fruit if consumed in the vacuum of space.",
    'Pasta is not a good way to glue things.',
    'Nasa is developing a new form of spacesuit which aims to prevent you from entering the playground after 9pm.',
    'If you mess up drinking water, you may suffocate.',
    'All animals can fly, but some only once.',
    'Drinking water at 10pm while saying "Your cute" to all your best friends can cause you to become cute yourself.',
    'Penelopie with an "i" is a cute name.',
    'Using your shoe as a flower pot could actually work.',
    "Using your shoes as a flower pot means you can't use them to walk anymore.",
    'Waking up in the morning is the best way to start your day.',
    'We love you for who you are. :max_heart:',
    'Sometimes I sleep outside.',
    'You always dream about yourself on Tuesdays.',
    'Zebras have stripes to make tigers hurt themselves in their confusion.',
    'If beans contain soy, then why are you made of hummus?',
    'Monday is often considered the first day of the week.',
    'We are made of Mayonnaise if you dig deep enough.',
    "November is the month you were born in, even if you don't realize it.",
    'If you weigh 49.5kg and eat 500g of m&ms, you are 1% m&m.',
    'Green is not a real color, instead it is made up of combining orange and greenish blue.',
    'In each and every marriage lives a gerbil.',
    'My favorite fruit is strawberries.',
    'Your pets have business meetings while you sleep.',
    'Clouds cannot be walked on in real life.',
    'Tetris is a game about finding the good in humanity.',
    "\" Don't believe the source of every quote\" - Albert Einstein",
    'Bats can read your mind and comfort you in times of need.',
    'Weeds grow in your backyard even if you ask them not to.',
    'Your sleeping right now, wake up.',
    'If the Matrix can be created in real life, you are probably in one right now.',
    "Zebras are only black and white because they cannot see in color and therefore couldn't make another decision.",
    'Some Pans cannot be used to cook.',
    "If you golf with your hands, you can't bake cakes.",
    'Being left handed is something to be proud of.',
    'Having a guide dog for being colorblind is not a good idea.',
    'Math is just a distraction to make you not notice the rats in your back yard.',
    'Cats cannot tell you their favorite color as they cannot speak.',
    'You forget how to walk if you try and think about how you walk while walking.',
    'Submitting a pull request is the best way to confess your love to your significant other.',
    "Sometimes I want to pick flowers by the sand, but they won't let me.",
    "I can't hear you, but I also don't have ears.",
    'Opening the pickle jar can cause you to eat pickles inadvertently.',
    'V8 Juice is made up of green things.',
    'Vegetables are kinda icky.',
    'I really wish you would stop texting me at 3am.',
    "I'm hungry... Are you?",
    'Stop, Drop, and Roll if you ever feel the need to stretch your legs.',
    'Floor tiles can not solve all your problems.',
    'Cute people will make you smile.',
    'The popular song in Phineas and Ferb, squirrel in my pants: is about someone with squirrels in their pants.',
    "The length of Great Britain's coastline remains a mystery.",
    'Giving a door as a birthday gift may not give you the expected response.',
    'Fire is often fairly warm.',
    'TransPlace placed trans on place.',
    "These quotes aren't all true.",
    'I am never gonna give you up.',
    'Mathematicians warn we may run out of natural numbers by the end of the century.',
    'Magnets become less attractive and more repulsive after having children.',
    'Earth’s Magnetic Field can be restarted with nuclear bombs.',
    'Magnets become stronger in the cold because they shiver.',
    'Most potatoes are farmed underground.',
    'Yellow golf balls have been found to be made of golf balls.',
    'Some plants and trees grow upside down.',
    'Money is actually just paper with emotional value.',
    'Saté sauce is often made from simple peanut butter in home recipes.',
    'The UK has a large population so sometimes we have to live in the UK.',
    'The average person walks the equivalent of a mile in their lifetime.',
    'Magnetism is a phenomenon that occurs when two or more atoms are attracted to each other.',
    'Sometimes we see things from the past, sometimes things from the future.',
    'Often yellow things are made of yellow things.',
];

/**
 * Picks a random element of an array
 * @param {E[]} array An array
 * @returns {E} A random element of the array
 */
function pickRandomElement(array) {
    return array[Math.floor(Math.random() * greeterMessages.length)];
}

/**
 * Picks a random greeter message with the mention inserted
 * @param {string} mention A string to be rendered as the user part of the greeting message
 * @returns {string} A random greeter message
 */
function pickGreeterMessage(mention) {
    return pickRandomElement(greeterMessages).replace('{user}', mention);
}

/**
 * Picks a random image url
 * @returns {string} A random image url
 */
function pickImageUrl() {
    return pickRandomElement(imageUrls);
}

/**
 * Picks a random emoji
 * @returns {string} A random emoji
 */
function pickEmoji() {
    return pickRandomElement(emojis);
}

/**
 * Picks a random fact
 * @returns {string} A random fact
 */
function pickFact() {
    return pickRandomElement(facts);
}

/**
 * Builds greet message content
 * @param {GuildMember} applicant A member of the server
 * @returns {string} The welcome message content
 */
function buildGreetMessageContent(applicant) {
    return `${roleMention(config.roles.greeter)}, ${pickGreeterMessage(userMention(applicant.id))}`;
}

/**
 * Builds a greet embed for a recently verified user
 * @param {GuildMember} applicant A member of the server
 * @returns {Embed[]|APIEmbed[]} Embeds for a welcome message
 */
function buildGreetEmbeds(applicant) {
    return [
        new EmbedBuilder()
            .setColor(0xF5F5F5)
            .setTitle(`Welcome to TransPlace, a place for trans people. ${pickEmoji()}`)
            .setDescription(
                `${bold(`Welcome ${userMention(applicant.id)}! We're glad to finally meet you!`)}\n${italic('Why don\'t you check out some of the channels below to get started?')}\n\n<id:customize> - Assign some Roles!\n${channelMention(config.channels.introduce)} - Introduce Yourself!\n${channelMention(config.channels.general)} - Start Chatting!`,
            )
            .setImage(pickImageUrl())
            .setFooter({
                text: `Did you know? : ${pickFact()}`,
            }),
    ];
}

export {
    buildGreetMessageContent,
    buildGreetEmbeds,
};
