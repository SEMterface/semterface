var io = require('socket.io')()
var persona = require('./persona')('http://localhost:3000')

function socketHandler(http) {
  io.attach(http);
  io.serveClient(false);

  io.use(function(socket, next) {
    var handshake = socket.handshake;
    console.log(handshake);
    persona(handshake.query.assert, function(err, authorized, info) {
      console.log('returned from persona');
      if (err || !authorized) return next(new Error('not authorized'));
      socket.client.email = info.email
      next();
    })
  })

  io.on('connection', function(socket) {
    console.log(socket.client.email + " joined");
    socket.emit('news', {
      hello: 'Things appear to be turned on.'
    });
  })

}

module.exports = socketHandler;
