const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('newMessage', {
    from: 'Joe Banks',
    text: 'I love you',
    createdAt: new Date(),
  });

  socket.on('createMessage', function(msg) {
    console.log(msg);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client.');
  });
});

server.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
