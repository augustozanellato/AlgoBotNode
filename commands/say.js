module.exports = {
    name: 'say',
    aliases: ['repeat'],
    description: 'Repeat a message',
    usage: 'say <message>',
    execute(message, args) {
        if (args.length > 0)
            message.channel.send(args.join(' '));
        else
            message.reply('You did not send a message to repeat, cancelling command.');
    }
};