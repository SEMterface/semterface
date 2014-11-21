var io = require('socket.io')()

function socketHandler (http) {
  io.attach(http);
  io.serveClient(false);

  io.on('connection', function (socket) {

    socket.emit('news', { hello: 'Things appear to be turned on.' });

    socket.on('my other event', function (data) {
      console.log(data);
    });

  });
}

module.exports = socketHandler;
