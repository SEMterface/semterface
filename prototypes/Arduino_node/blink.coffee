{SerialPort} = require('serialport')
fs = require 'fs'
 
port   = '/dev/tty.usbserial-A800ewsy'
serial = null
value  = 48
 
toggle = =>
  value = if value == 48 then 49 else 49
  serial.write new Buffer([value])
 
console.log "Starting..."
fs.stat port, (err, stats) ->
  if err?
    console.log "Couldn't stat #{port}"
    process.exit()
 
  console.log "Started."
 
  serial = new SerialPort port, baudrate: 9600
  setInterval toggle, 1000