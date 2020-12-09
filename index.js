require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
console.log(process.env.TOKEN)


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message => {
    if (message.content === ".random") { 
        const number = Math.random();
        message.channel.send(number.toString()); //
    }
});

bot.login(TOKEN);