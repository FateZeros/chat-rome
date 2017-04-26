# chat-rome
a simple chatRoom with Node.js

# express
```bash
npm install express --save

http.createServer() !!
```

# Socket.IO
```bash

npm install socket.io --save

```
1.emit: 用来发射一个事件或者说触发一个事件，第一个参数为事件名，第二个参数为要发送的数据，
第三个参数为回调函数（一般省略，如需对方接受到信息后立即得到确认时，则需要用到回调函数）。

2.on: 用来监听一个 emit 发射的事件，第一个参数为要监听的事件名，第二个参数为一个匿名函数用来接收对方发来的数据，
该匿名函数的第一个参数为接收的数据，若有第二个参数，则为要返回的函数。

[参考](https://github.com/thesadboy/ChatRoom)
[socket.io](https://socket.io/)
