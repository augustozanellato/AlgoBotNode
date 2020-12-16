const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
const config = require("./config.json");
const prefix = config.prefix;
require('dotenv').config();
const commands = require('./help');
const plotly = require('plotly')(process.env.URSERNAME, process.env.API_KEY);
const math = require('mathjs');
var fs = require('fs');

let bot = new Client();

bot.once('ready', () => 
{
    	console.log(`Logged in as ${bot.user.tag}.`);
		var num_users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

	    console.log(`Bot has started, with ${num_users} users, in ${bot.guilds.cache.size} guilds.`);

		// set status di quanti server attivi con utenti
    	bot.user.setActivity(`${prefix}help | Serving ${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
});


bot.on('message', async message => 
{
  // Check for command
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
    let args = message.content.slice(prefix.length).split(' ');
    let command = args.shift().toLowerCase();

	switch (command) 
	{

		case 'ping':
			const msg = await message.channel.send('Ping?');
			msg.edit(`Pong! Latency is ${m.createdTimestamp -message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
			break

		case 'say':
		case 'repeat':
			if (args.length > 0)
				message.channel.send(args.join(' '));
			else
				message.reply('You did not send a message to repeat, cancelling command.');
			break
		
		case 'graph':
			console.log(message.id);
			var func = args.join(' ');
			console.log(func);
			
			draw(func ,message.id);

			const path = `${message.id}.png`;

			setTimeout(function x(){
				var attachment = new MessageAttachment(path);
				message.channel.send("", attachment);
			}, 1000);

			break;


		case 'random':
			if (args.length > 1)
				message.reply('Too many arguments, cancelling command.');
			else if (args.length > 0)
			{
				if(parseInt(args[0]) > 1)
				{
					console.log(1 + Math.floor(Math.random() * parseInt(args[0])));
					message.channel.send(`\`\`\`${1 + Math.floor(Math.random() * parseInt(args[0]))}\`\`\``);
				}
				else
					message.reply('You did set an incorrect value for the interval, cancelling command.');			
			}
			else
				message.reply('You did not set the value of the interval, cancelling command.');
			break

		case 'bella':
			message.channel.send(`bella <@${message.author.id}>`);
			break

		case 'help':
			let embed =  new MessageEmbed()
				.setTitle('AlgoBot')
				.setColor('#7fe5f0')
				.setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
			
			if (!args[0])
				embed
				.setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
			else 
			{
				if ( Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase()))
				{
					let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
					embed
						.setTitle(`COMMAND - ${command}`)

					if (commands[command].aliases)
						embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
					embed
						.addField('DESCRIPTION', commands[command].description)
						.addField('FORMAT', `\`\`\`${prefix}${commands[command].format}\`\`\``);
				}
				else 
				{
					embed
						.setColor('RED')
						.setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
				}
			}
			message.channel.send(embed);
		break;

	}
	
});


bot.on("guildCreate", guild => 
{
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	bot.user.setActivity(`${prefix}help | Serving ${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
});
  
bot.on("guildDelete", guild => 
{
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	bot.user.setActivity(`${prefix}help | Serving ${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
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


