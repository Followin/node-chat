const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Message } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user joined');

  socket.emit('newMessage', new Message('Admin', 'Welcome to the chat'));

  socket.broadcast.emit('newMessage', new Message('Admin', 'New user join the chat'));

  socket.on('createMessage', function (message) {
    io.emit('newMessage', new Message(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
