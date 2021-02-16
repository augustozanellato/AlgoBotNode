module.exports = {
    name: 'random',
	description: 'Return a random number between an interval',
    usage: 'random <value>',
    execute(message, args) {
            if (args.length > 1)
				message.reply('Too many arguments, cancelling command.');
			else if (args.length > 0) {
				if (parseInt(args[0]) > 1) {
					console.log(1 + Math.floor(Math.random() * parseInt(args[0])));
					message.channel.send(`\`\`\`${1 + Math.floor(Math.random() * parseInt(args[0]))}\`\`\``);
				} else
					message.reply('You did set an incorrect value for the interval, cancelling command.');
			} else
				message.reply('You did not set the value of the interval, cancelling command.');
    }
};