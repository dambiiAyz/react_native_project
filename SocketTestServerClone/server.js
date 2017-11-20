var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(process.env.PORT || 3000);

console.log('server running .. '+process.env.PORT)

app.get('/', (req, res) => {

	return res.send(404, 'Sorry, we cannot find that!');
//	res.sendFile(__dirname + '/index.html');
});
