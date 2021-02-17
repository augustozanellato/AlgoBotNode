module.exports = {
    name: 'graph',
    aliases: ['plot'],
    description: 'Generate a plot image of a given function.',
    usage: 'graph <value>',
    execute(message, args) {

        require('dotenv').config("../.env");

        const { MessageAttachment } = require('discord.js');

        const fs = require('fs');
        const math = require('mathjs');
        const plotly = require('plotly')(process.env.NICKNAME, process.env.API_KEY);

        function draw(expression, id) {
            try {

                const expr = math.compile(expression);

                // evaluate the expression repeatedly for different values of x
                /* TWEAK HERE */
                const range = 20; // plot from -range/2 to range/2
                const step = 0.01;
                /* END TWEAK */
                const endX = range / 2;
                const startX = -endX;
                const steps = Math.abs(endX - startX) / step;
                // evaluate the expression repeatedly for different values of x
                const xValues = math.range(startX, endX, step).toArray();
                xValues.splice(Math.round(steps / 2), 1, 0);

                const yValues = xValues.map(function (equation) {
                    return expr.evaluate({
                        x: equation
                    });
                })

                // render the plot using plotly
                const trace1 = {
                    x: xValues,
                    y: yValues,
                    type: 'scatter'
                }

                var figure = {
                    'data': [trace1]
                };

                var imgOpts = {
                    usage: 'png',
                    width: 1000,
                    height: 500
                };

                plotly.getImage(figure, imgOpts, function (error, imageStream) {
                    if (error) return console.log(error);
                    var fileStream = fs.createWriteStream(`../${id}.png`);
                    imageStream.pipe(fileStream);


                });

            } catch (err) {
                message.channel.send('Something went wrong');
                console.error(err);
            }
        }

        var func = args.join(' ');

        draw(func, message.id);

        var path = `../${message.id}.png`;

        setTimeout(function x() {
            var attachment = new MessageAttachment(path);
            message.channel.send("", attachment);
            setTimeout(function f() {
                fs.unlink(path, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                })
            }, 1000);

        }, 2000);


    }
}