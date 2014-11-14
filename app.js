
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var request = require('request');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(server);

io.sockets.on('connection', function (socket) {

  socket.emit('news', { hello: 'Things appear to be turned on.' });

  socket.on('send', function(data) {
    console.log(data);
    io.sockets.emit('control', data);
  });

  socket.on('res', function(data) {
    console.log(data);
    io.sockets.emit('status', data);
  })

  socket.on('login', function(data){
    var options = {
      method: 'POST',
      url: "https://verifier.login.persona.org/verify",
      qs: {
        assertion: data.assertion,
        audience: "https://semterface.herokuapp.com"
      }
    }

    request(options, function(err,res,body) {
      var info = JSON.parse(body);
      if (JSON.parse(body).status === "okay") {
        socket.set('email', body.email), function() {
          console.log(email + ' is logged in')
          socket.emit('login', 'okay');
        }
      }
      else {
        console.log('login failure')
        console.log(res);
        console.log(body);
        console.log(err);
        socket.emit('logout', 'logout');
      }
    })
  })

  socket.on('logout', function(data) {
    console.log('user wants to log out');
    socket.set('email', null), function() {
      socket.emit('logout', 'logout');
    }
  })
});
