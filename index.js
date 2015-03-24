// Express
var fs = require('fs')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var npmcss = require('npm-css')

// We need this passed to our http and socket.io server
var session = expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
})

// 3rd Party
var browserify = require('browserify-middleware')
var autoprefixer = require('express-autoprefixer')

// Routes
var routes = require('./routes/index')

// Set up the servers
var app = express() // Express
var server = require('http').Server(app) // Attatch http server to express
var ioServer = require('./lib/ioServer')(server, session) // Start iojs Server

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// render bundle
var cssPath = path.join(__dirname, 'public', 'css')
var css = npmcss(path.join(cssPath, 'style.css'))
fs.writeFileSync(path.join(cssPath, 'bundle.css'), css)

// Middleware //

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'))

app.use(logger('dev')) // Logging

app.use(bodyParser.json()) // Parse json

// Parse forms
app.use(bodyParser.urlencoded({
  extended: false
}))
// Parse cookies
app.use(cookieParser())
app.use(session)

// Browserify JS
var shared = ['jquery']
app.get('/js/bundle.js', browserify(shared))
app.use('/js', browserify('./client', {
  external: shared
}))

// Prefix CSS
app.use(autoprefixer({
  browsers: 'last 2 versions',
  cascade: false
}))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// Expose our fat app var
module.exports = app
// Exposing the http server
module.exports.server = server
