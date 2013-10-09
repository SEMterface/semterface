
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var SerialPort = require('serialport').SerialPort;
var ioclient = require('socket.io-client');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3001);
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

socket = ioclient.connect('http://localhost:3000/');  
socket.on('news', function (data) {
      console.log(data);
});

var portName = '/dev/tty.usbserial-A800ewsy'; // My Arduino
//var portName = '/dev/tty.usbmodem3d11'; // SEM Port

console.log("Serial session started.");
serial = new SerialPort(portName, {
    baudrate: 9600
});

socket.on('control', function (data) {
    console.log(data);
    switch(data.move) {
    case 'up':
    serial.write(new Buffer([119]));
    break;
    case 'down':
    serial.write(new Buffer([115]))
    break;
    case 'right':
    serial.write(new Buffer([100]));
    break;
    case 'left':
    serial.write(new Buffer([97]));
    break;  
  }
});