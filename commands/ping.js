module.exports = {
	name: 'ping',
	description: 'Ping!',
	usage: 'ping',
	execute(message, args, bot) {
		const { MessageEmbed } = require('discord.js');

		// message.channel.send('Pong!');
		const msg =message.channel.send("Pinging...").then(m =>{
			// The math thingy to calculate the user's ping
			var ping = m.createdTimestamp - message.createdTimestamp;
			
			let embed = new MessageEmbed()
				.setTitle('AlgoBot')
				.setColor('#7fe5f0')
				.addField("🏓 PING 🏓", `Your ping is ${ping}ms 🏓`)
				.setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())

			m.edit("🏓 PONG! 🏓", embed);
		});
		// const msg = message.channel.send('Ping?');
        // msg.edit(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms.`);
		// msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);


	}
};
