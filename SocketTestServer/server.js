var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];
player1 = '';
player2 = '';
count = 0;

server.listen(process.env.PORT || 3000);

console.log('server running .. ')

app.get('/', (req, res) => {

	return res.send(404, 'Sorry, we cannot find that!');
//	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {

	// connect
	connections.push(socket);
	console.log('Connected: %s  ID : %s', connections.length, socket.id);

	socket.on('message', (message) => {

		console.log(message);
		// message.id = 'aaaaa'
		// io.sockets.emit('new message', message);
	});

	socket.on('userJoined', (userId) => onUserJoined(userId, socket, connections.length));

	// disconnent
	socket.on('disconnect', (data) => {
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log('disconnent: %s sockets connected', connections.length)
	});

	// send message
	socket.on('send message', (data) => {
	//		console.log(data);
			io.sockets.emit('new message', {msg: data.text, user: socket.username});

	});

	// new user
	socket.on('new user', (data, callback) => {
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();

	});

	updateUsernames = () =>{
		io.sockets.emit('get users', users);
	}

	socket.on('startGame', (json) => {

		console.log(json)

		app.get('/1', (req, res) => {

			 res.send(json);
		});

		io.sockets.emit('onStart Game', { msg : json } )

	});

	
});

// onStartGame = (userId, socket) =>{

// 	count++;
// 	console.log(userId+' iim bn')

// //	if(count == 2){

		
// 		count = 0 
// //	}
// }

onUserJoined = (userId, socket, length) => {
  try {
    
    if (!userId) {    
    	console.log('id - '+length)
        socket.emit('userJoined', length);          
    } 

  } catch(err) {
    console.err(err);
  }
}

