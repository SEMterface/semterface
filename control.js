var io = require('socket.io/node_modules/socket.io-client');
var SerialPort = require("serialport").SerialPort;
var fs = require('fs');

socket = io.connect('localhost:3');

//var portName = '/dev/tty.usbserial-A800ewsy'; // My Arduino
var portName = '/dev/tty.usbmodem3d11'; // SEM Port

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