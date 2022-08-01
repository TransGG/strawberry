// event handler for ready event
// ready is triggered when the bot turns on

module.exports = {
    name: 'ready', //must match file name
    run: async (bot) => {
        console.log(`Logged in as ${bot.client.user.tag}`)
    }
}