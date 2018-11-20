var socket = io();
socket.on('connect', function(data) {
  console.log('brad');
    socket.emit('testApi', 'Brad');
});
