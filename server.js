var budo = require('budo')
var babelify = require('babelify')

budo('./index.js', {
  live: true, // setup live reload
  open: true,
  dir: ['./static', './static'],
  stream: process.stdout,
  browserify: {
    transform: babelify // ES6
  }
}).on('connect', function (ev) {
  console.log('Server running on %s', ev.uri)
  console.log('LiveReload running on port %s', ev.livePort)
}).on('update', function (buffer) {
  console.log('bundle - %d bytes', buffer.length)
})
