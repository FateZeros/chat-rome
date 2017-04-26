$(function() {
	var from = $.cookie('user')

	var socket = io()
	
	//获取在线人数
	socket.on('onlineCount', function(data) {
		console.log(data)
		$('#userCount').text(data.onlineNums)
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