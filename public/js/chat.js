$(function() {
	var from = $.cookie('user')

	var socket = io()
	
	//新用户进入
	socket.emit('newUser')
	socket.on('userNums', function(data) {
		console.log(data)
		$('#userCount').text(data)
	})

	$('form').submit(function() {
		socket.emit('chatMsg', $('#m').val())
		$('#m').val('')
		return false
	})
	socket.on('chatMsg', function(msg) {
		$('#allMsgs').append($('<li>').text(msg))
	})


})