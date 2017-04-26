var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);


app.set('port', process.env.PORT || 5002);
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')));

//在线人数统计
var onlineNums = 0

var clients = [];



app.get('/', function(req, res) {
	// res.send('hello world')
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
	onlineNums++
	socket.emit('onlineCount', { onlineNums: onlineNums })

	console.log('a user connected')
	socket.on('online', function(data) {
		console.log(data)
	}) 

	socket.on('chatMsg', function(msg) {
		console.log('message:' + msg)
		io.emit('chatMsg', msg)
	})
	//disconnect
	socket.on('disconnect', function() {
		onlineNums--
		console.log(onlineNums)
		socket.emit('onlineCount', { onlineNums: onlineNums })
		console.log('user disconnected')
	})
})

server.listen(app.get('port'), function() {
	console.log(`chat rome listening on port : ${app.get('port')}`)
})