var io = require('socket.io')()
var persona = require('../lib/persona')('http://localhost:3000')

function socketHandler(http, session) {
  io.attach(http);
  io.serveClient(false);

  io.use(function(socket, next) {
    session(socket.request, socket.request.res, next)
  })

  io.use(function(socket, next) {
    console.log(socket.request.session)
    var session = socket.request.session;
    if (!session.email) {
      console.log('no email set')
      return next(new Error('log in first please'))
    }
    next()
  })


  io.on('connection', function(socket) {
    console.log(socket.request.session.email + " joined")
    socket.emit('news', {
      hello: 'Things appear to be turned on.'
    });
  })

}

module.exports = socketHandler;
