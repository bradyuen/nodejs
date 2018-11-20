var socket = io();
socket.on('connect', function(data) {
    socket.emit('joined', 'Hello World from client');
});

socket.on('message', function(data) {
  alert(data);
});
