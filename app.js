
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var SerialPort = require("serialport").SerialPort;

var app = express();
var server = http.createServer(app);
var portName = '/dev/tty.usbserial-A800ewsy'; // My Arduino
//var portName = '/dev/tty.usbmodem3d11'; // SEM Port

// all environments
app.set('port', process.env.PORT || 3000);
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

fs.stat(portName, function(err, stats) {
    if (err != null) {
      console.log("Couldn't stat " + portName);
      process.exit();
    }
    console.log("Serial session started.");
    serial = new SerialPort(portName, {
      baudrate: 9600
    });
  });

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'Things appear to be turned on.' });
  socket.on('up', function () {
        console.log("go up");
        serial.write(new Buffer([119]));
    });
  socket.on('down', function () {
        console.log("go down");
        serial.write(new Buffer([115]));
    });
  socket.on('right', function () {
        console.log("go right");
        serial.write(new Buffer([100]));
    });
  socket.on('left', function () {
        console.log("go left");
        serial.write(new Buffer([97]));
    });
});