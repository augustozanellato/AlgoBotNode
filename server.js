const html = require('http');

html.createServer(function (req, res) {
	res.write("AlgoBot is currently working!");
	res.end();
}).listen(8080); 