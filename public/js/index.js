var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Gaby Banks',
    text: 'Hi baby'
  });
});

socket.on('newMessage', function (msg) {
  console.log(msg);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});