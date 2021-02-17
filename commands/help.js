module.exports = {
    name: 'help',
    description: 'Embed message with all commands available',
    usage: 'help [command-name]',
    execute(message, args) {

        const { MessageEmbed } = require('discord.js');

        const { prefix } = require("../config.json");

        let embed = new MessageEmbed()
            .setTitle('AlgoBot')
            .setColor('#7fe5f0')
            .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())

        if(args.length == 1)
            embed
                .setTitle(`COMMAND - ${args[0].name}`);
        else
            embed
                .setTitle(`ALL COMMANDS`);

        args.forEach( command => {

            if(args.length > 1)
                command = command.value;

            embed
                .addField(`NAME:  `, command.name );
            
            if (command.aliases){
                embed.
                    addField('Command aliases', `\`${command.aliases.join('`, `')}\``);
            }

            embed
                .addField('DESCRIPTION', command.description) 
                .addField('usage', `\`\`\`${prefix}${command.usage}\`\`\` \n`);
        });
        
        message.channel.send(embed);
    }
}


