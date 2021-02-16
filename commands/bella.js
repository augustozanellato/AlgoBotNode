module.exports = {
    name: 'bella',
    description: 'Greets you back',
    usage: 'bella',
    execute(message, args) {
        message.channel.send(`bella <@${message.author.id}>`);
    }
};
