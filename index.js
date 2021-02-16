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
		message.reply(`my prefix here is ${prefix}`)
		return;
	};
	
	// Check for command

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	var args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!bot.commands.has(commandName) && !bot.commands.find(c => c.aliases && c.aliases.includes(commandName))) {
		message.reply("Command not found");
		return;
	}
	// console.log(bot.commands);
	const command = bot.commands.get(commandName) || bot.commands.find(c => c.aliases && c.aliases.includes(commandName));
	
	// If a get a help command i need to get all the names,description of all the modules

	if(commandName == 'help'){
		if(args[0]){
			const command_help = args.shift().toLowerCase();
			args[0] = bot.commands.get(command_help) || bot.commands.find(c => c.aliases && c.aliases.includes(command_help));

			if(!args[0])
				return message.reply("Invalid argument");
			
			console.log(args);
			command.execute(message, args);
		}
		else{
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



const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('The Discord bot is down!'));
app.listen(port, () =>
	console.log(`App listening at http://localhost:${port}`)
);

require('./server');

bot.login(process.env.TOKEN);



<<<<<<< HEAD
=======
function draw(expression, id) {
    try {
      
      const expr = math.compile(expression)
      /* TWEAK HERE */
      const range = 20 // plot from -range/2 to range/2
      const step = 0.1
      /* END TWEAK */
      const endX = range/2
      const startX = -endX
      const steps = Math.abs(endX - startX) / step
      // evaluate the expression repeatedly for different values of x
      const xValues = math.range(startX, endX, step).toArray()
      xValues.splice(Math.round(steps/2), 1, 0)
      const yValues = xValues.map(function (x) {
        return expr.evaluate({x: x})
      })

      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter'
      }

      var figure = { 'data': [trace1] };

      var imgOpts = {
          format: 'png',
          width: 1000,
          height: 500
      };
      
      plotly.getImage(figure, imgOpts, function (error, imageStream) {
          if (error) return console.log (error);
          var fileStream = fs.createWriteStream(`${id}.png`);
          imageStream.pipe(fileStream);
          

      });
    }
    catch (err) {
            console.error(err)
      }
}


>>>>>>> 295962eb5e363be8bb28f517d6ad196636ee0a94
