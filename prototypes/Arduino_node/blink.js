// Generated by CoffeeScript 1.6.3
(function() {
  var SerialPort, fs, port, serial, toggle, value,
    _this = this;

  SerialPort = require('serialport').SerialPort;

  fs = require('fs');

  port = '/dev/tty.usbmodem1d11';

  serial = null;

  value = 48;

  toggle = function() {
    value = value === 48 ? 49 : 49;
    return serial.write(new Buffer([value]));
  };

  console.log("Starting...");

  fs.stat(port, function(err, stats) {
    if (err != null) {
      console.log("Couldn't stat " + port);
      process.exit();
    }
    console.log("Started.");
    serial = new SerialPort(port, {
      baudrate: 9600
    });
    return setInterval(toggle, 1000);
  });

}).call(this);