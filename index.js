const {
	Client,
	Collection,
	MessageEmbed,
	MessageAttachment
} = require('discord.js');

const fs = require('fs');

const bot = new Client();
bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

require('dotenv').config(".env");
const { prefix } = require("./config.json");


bot.once('ready', () => {

	console.log(`Logged in as ${bot.user.tag}.`);
	var num_users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

	console.log(`Bot has started, with ${num_users} users, in ${bot.guilds.cache.size} guilds.`);

	// set status di quanti server attivi con utenti
	bot.user.setActivity(`${prefix}help | Serving ${bot.guilds.cache.size} servers`, {
		type: 'LISTENING'
	});
});

bot.on('message', async message => {

	// Check mention

	if (message.mentions.users.has(bot.user.id) && !message.author.bot) {
		message.reply(`my prefix here is \"${prefix}\" `)
		return;
	};

	// Check for command

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	var args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	//prevent spamming "Command not found" if only the prefix is sent
	if (commandName.length == 0) {
		return;
	}
	
	if (!bot.commands.has(commandName) && !bot.commands.find(c => c.aliases && c.aliases.includes(commandName))) {
		message.reply("Command not found");
		return;
	}
	// console.log(bot.commands);
	const command = bot.commands.get(commandName) || bot.commands.find(c => c.aliases && c.aliases.includes(commandName));
	
	// If a get a help command i need to get all the names,description of all the modules

	if (commandName == 'help') {
		if (args[0]) {
			const command_help = args.shift().toLowerCase();
			args[0] = bot.commands.get(command_help) || bot.commands.find(c => c.aliases && c.aliases.includes(command_help));

			if (!args[0])
				return message.reply("Invalid argument");

			// console.log(args);
			command.execute(message, args);
		} else {
			args = [];
			args = [...bot.commands].map(([name, value]) => ({ value }));
			command.execute(message, args);
		}
		return;
	}
	command.execute(message, args);

});


bot.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	bot.user.setActivity(`${prefix}help | Serving ${bot.guilds.cache.size} servers`, {
		type: 'LISTENING'
	});
});

bot.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	bot.user.setActivity(`${prefix}help | Serving ${bot.guilds.cache.size} servers`, {
		type: 'LISTENING'
	});
});


bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('The Discord bot is down!'));
app.listen(port, () =>
	console.log(`App listening at http://localhost:${port}`)
);

require('./server');

bot.login(process.env.TOKEN);
