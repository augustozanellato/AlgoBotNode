// keep alive the bot //
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
const keep_alive = require('./keep_alive.js');
// keep alive the bot //

// start bot
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const prefix = '.';

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);

	var num_users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

	console.log(
		`Bot has started, with ${num_users} users, in ${
			bot.guilds.cache.size
		} guilds.`
	);
	// set status di quanti server attivi con utenti
	bot.user.setActivity(
		`. | Serving ${bot.guilds.cache.size} servers and ${num_users} users`
	);
});

bot.on('message', async message => {
	// se il messaggio lo scrive un bot
	if (message.author.bot) return;

	// se il messaggio non iniza con il tuo prefix
	if (!message.content.startsWith(prefix)) return;

	// tolgo il prefix e metto il messaggio in LowerCase
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
    
	const command = args.shift().toLowerCase();
  //random command
	if (command === 'random') {
    var parameter;
    try {
      parameter =  parseInt(args.shift().toLowerCase());
    } catch (error) {
      parameter = 1000;
    }
    
		const number = 1 + Math.floor(Math.random() * (parameter));
    console.log(parameter.toString() );
		message.channel.send(number.toString() );
	}

	if (command === 'bella') {
		message.channel.send('bella ' + '<@' + message.author.id + '>');
	}

	if (command === 'ping') {
		// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
		// The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
		const m = await message.channel.send('Ping?');
		m.edit(
			`Pong! Latency is ${m.createdTimestamp -
				message.createdTimestamp}ms. API Latency is ${Math.round(
				bot.ws.ping
			)}ms`
		);
	}
});

// server add/remove update

bot.on('guildCreate', guild => {
	// sengalazione quando viene aggiunto da un server
	console.log(
		`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${
			guild.memberCount
		} members!`
	);
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on('guildDelete', guild => {
	// sengalazione quando viene rimosso da un server
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

// fine server add/remove update

bot.login(TOKEN);
