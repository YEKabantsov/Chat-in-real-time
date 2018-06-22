var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	// console.log('Someome joined');
	var user = Date.now();

	socket.on('message.sent', function (message) {
		io.emit('message', user + ': ' + message);
		console.log(message);
	});

	io.emit('message', 'User ' + user + ' connected');
	console.log('User ' + user + ' connected');
});

http.listen(process.env.PORT || 3000, function(){
	console.log('Start server');
});
