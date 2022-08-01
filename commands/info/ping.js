// command handler for ping command
// usage: {prefix}ping

module.exports = {
    name: 'ping',
    category: 'info',
    permissions: [], // permissions contains any permissions the members are required to have to run the command
    devOnly: false, // if devOnly is true, only the people who are defined as bot owners will be able to use it
    run: async ({client, message, args}) => {
        message.reply('pong')
    }
}