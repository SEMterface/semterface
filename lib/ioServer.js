var io = require('socket.io')()

function socketHandler (http, session) {
  io.attach(http)
  io.serveClient(false)

  io.use(function (socket, next) {
    session(socket.request, socket.request.res, next)
  })

  io.use(function (socket, next) {
    console.log(socket.request.session)
    var session = socket.request.session
    if (!session.email) {
      console.log('no email set')
      return next(new Error('log in first please'))
    }
    next()
  })

  io.on('connection', function (socket) {
    console.log(socket.request.session.email + ' joined')
    socket.emit('news', {
      msg: 'Things appear to be turned on.'
    })

    socket.on('control', function (msg) {
      socket.emit('update', {
        id: msg.id,
        value: msg.value
      })
    })
  })
}

module.exports = socketHandler
