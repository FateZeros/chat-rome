var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);


app.set('port', process.env.PORT || 5004);
//加载静态资源
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())


var clients = []
var userNums = 0


app.get('/', function(req, res) {
	console.log('Cookie: ', req.cookies)
	console.log('Signed Cookies: ', req.signedCookies)
	if(!req.headers.cookie)
  {
    res.redirect('/logoIn')
    return
  }
  console.log(12)
	// res.send('hello world')
	res.sendFile(__dirname + '/views/index.html')
})

app.get('/logoIn',function(req, res) {
  res.sendFile(__dirname +'/views/logoIn.html')
})

app.get('/register', function(req, res) {
	res.sendFile(__dirname +'/views/register.html')
})

io.on('connection', function(socket) {
	socket.on('newUser', function(data) {
		console.log(userNums++)
		socket.emit('userNums', userNums++)
	})

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
		socket.emit('userNums', userNums--)
		console.log('user disconnected')
	})
})

server.listen(app.get('port'), function() {
	console.log(`chat rome listening on port : ${app.get('port')}`)
})