//Vanilla Express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// 3rd Party
var browserify = require('browserify-middleware');
var autoprefixer = require('express-autoprefixer');

// Routes
var routes = require('./routes/index');

// Set up the servers
var app = express(); // Express
var server = require('http').Server(app); // Attatch http server to express
var ioServer = require('./lib/ioServer')(server) // Start iojs Server

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Middleware

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev')); // Logging

app.use(bodyParser.json()); // Parse json
app.use(bodyParser.urlencoded({
    extended: false
})); //Parse forms
//app.use(cookieParser()); // Parse cookies
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use('/js', browserify('./client')); // Browserify JS
app.use(autoprefixer({
    browsers: 'last 2 versions',
    cascade: false
})); //Prefix CSS

app.use(express.static(path.join(__dirname, 'public'))); //Static files

// Routes

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
module.exports.server = server; // Exposing the http server
