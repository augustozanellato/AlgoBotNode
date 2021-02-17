module.exports = {
    name: 'evaluate',
    description: 'Return the value of the expression',
    aliases: ['eval'],
    usage: 'evaluate <expression>',
    execute(message, args) {
        const math = require('mathjs');
        var expression = args.join(' ');

        try{
            const expr = math.compile(expression);
            var result = expr.evaluate();
            
            console.log(result);
            message.channel.send(`RESULT: \`\`\`${result}\`\`\``);

        } catch (err) {
            message.channel.send('Something went wrong');
            console.error(err);
        }
    }
};
