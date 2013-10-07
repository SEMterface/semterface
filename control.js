var io = require('socket.io/node_modules/socket.io-client');
var SerialPort = require("serialport").SerialPort;
var fs = require('fs');

var socket = io.connect('localhost:3000');
socket.on('connect', function () {
  // socket connected
  socket.emit('server custom event', { my: 'data' });
});
socket.on('news', function (data) {
      console.log(data);
    });

var portName = '/dev/tty.usbserial-A800ewsy'; // My Arduino
//var portName = '/dev/tty.usbmodem3d11'; // SEM Port


//console.log("Serial session started.");
//serial = new SerialPort(portName, {
//     baudrate: 9600
//});

socket.on('control', function(data) {
    console.log('i got a message');
    switch(data.move) {
    case 'up':
    console.log("go up");
    serial.write(new Buffer([119]));
    break;
    case 'down':
    console.log("go down");
    serial.write(new Buffer([115]))
    break;
    case 'right':
    console.log("go right");
    serial.write(new Buffer([100]));
    break;
    case 'left':
    console.log("go left");
    serial.write(new Buffer([97]));
    break;
  }
});