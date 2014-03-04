
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var ioclient = require('socket.io/node_modules/socket.io-client');
var stage = require('./lib/stage');
var scope = require('/lib/scope');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 9080);
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

var socket = ioclient.connect('http://semterface.herokuapp.com/');
//socket = ioclient.connect('http://semterface.aws.af.cm/');
socket.on('news', function (data) {
      console.log(data);
});


switch(process.platform) {
    case 'darwin':
    var stagePortName = '/dev/tty.usbserial-A800ewsy'; // My Arduino
    //var stagePortName = '/dev/tty.usbmodem3d11'; // SEM Port
    var scopePortName = '/dev/tty.PL2303-0000101D';
    break;
    case 'windows':
    var stagePortName = 'COM3'; //Windows 7 machines
    var scopePortName = 'COM5';
    break;
}

console.log('Stage Control started.');
var serial = new SerialPort(stagePortName, {
    baudrate: 9600
});

var scopeCom = new SerialPort(scopePortName, {
    baudrate: 2400
});

serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});


serial.on('open', function () {
    console.log('Serial is open');
    serial.on('data', function(data) {
    console.log('data received: ' + data);
  });
    socket.on('control', function (data) {
        console.log(data);
        switch(data.move) {
        case 'up':
        serial.write(stage.up);
        break;
        case 'down':
        serial.write(stage.down);
        break;
        case 'right':
        serial.write(stage.right);
        break;
        case 'left':
        serial.write(stage.left);
        break;
        case 'Read':
        scopeCom.write('ACC\r', function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });
        break
        }
    });
});