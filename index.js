var express = require('express');
var http = require('http');

var app = express()
var server = http.createServer(app)

var io = require('socket.io').listen(server)

app.get('/', function(req, res) {
	// res.send('hello world')
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
	console.log('a user connected')
	socket.on('chat message', function(msg) {
		console.log('message:' + msg)
		io.emit('chat message', msg)
	})
	//disconnect
	socket.on('disconnect', function() {
		console.log('user disconnected')
	})
})

server.listen(5002, function() {
	console.log('listen on port : 5002')
})