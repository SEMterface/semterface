var io = require('socket.io/node_modules/socket.io-client');
var SerialPort = require("serialport").SerialPort;
var fs = require('fs');

socket = io.connect('http://localhost:3000');

socket.on('connect',function() {
    socket.emit("test","foo");
    console.log('I emit')
}); 

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
    switch.
})

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