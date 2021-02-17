module.exports = {
    name: 'page',
	description: 'Return a scrollable a page-like message using reactions',
    usage: 'page',
    execute(message, args) {
        
        const { MessageEmbed } = require('discord.js');

        var ItemsOnEmbed = 10
        var test = Array.from(new Array(100),(val,index)=> "some string " + index );

        const generateEmbed = start => {
            const current = test.slice(start, start + ItemsOnEmbed)
            const embed = new MessageEmbed()
                .setTitle(`Testing`)
                .setFooter(`Page ${ Math.floor(start / ItemsOnEmbed) + 1} / ${ Math.floor(test.length / ItemsOnEmbed) }`)
                current.forEach(g => embed.addField("test", g))
            return embed
        }

        const author = message.author;

        message.channel.send(generateEmbed(0)).then(message => {

            if (test.length <= ItemsOnEmbed) return

            message.react('➡️')

            const collector = message.createReactionCollector(
                (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                {time: 300000}
            )

            let currentIndex = 0

            collector.on('collect', reaction => {
                
                message.reactions.removeAll().then(async () => {
                
                    reaction.emoji.name === '⬅️' ? currentIndex -= ItemsOnEmbed : currentIndex += ItemsOnEmbed

                    message.edit(generateEmbed(currentIndex))

                    if (currentIndex !== 0)
                        await message.react('⬅️')

                    if (currentIndex + ItemsOnEmbed < test.length)
                        message.react('➡️')
                })
            })
        })
    }
}