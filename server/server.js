const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, '../client/build');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(clientPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('createMessage', function(msg) {
    io.emit('newMessage', generateMessage(msg.from, msg.text));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client.');
  });
});

server.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
