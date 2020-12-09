require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message => {
    if (message.content === ".random") { 
        const number = Math.random();
        message.channel.send(number.toString()); //
    }
});
//test: potete modificare?
//provo a modificare by @Daniele4ciocchi nice
bot.login(TOKEN);