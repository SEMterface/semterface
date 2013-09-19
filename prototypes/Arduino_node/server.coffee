{SerialPort} = require('serialport')
fs = require 'fs'
 
port = '/dev/tty.usbmodem1d11'
express = require 'express'
serial = null
interval = null
lightOn = false
 
turnOn = =>
  lightOn = true
  serial.write new Buffer([49])
 
turnOff = =>
  lightOn = false
  serial.write new Buffer([48])

sendA = =>
  serial.write new Buffer([97])
  
sendS = =>
  serial.write new Buffer([115])
  
sendD = =>
  serial.write new Buffer([100])
  
sendW = =>
  serial.write new Buffer([119])
 
toggle = =>
  if lightOn
    turnOff()
  else
    turnOn()
 
app = express.createServer()
 
app.get '/', (req, res) ->
  res.sendfile 'index.htm'
 
app.get '/on', (req, res) ->
  clearInterval interval
  turnOn()
  res.end()
 
app.get '/off', (req, res) ->
  clearInterval interval
  turnOff()
  res.end()
 
app.get '/blink', (req, res) ->
  clearInterval interval
  interval = setInterval toggle, 500
  res.end()

app.get '/a', (req, res) ->
  clearInterval interval
  sendA()
  res.end()

app.get '/s', (req, res) ->
  clearInterval interval
  sendS()
  res.end()
  
app.get '/d', (req, res) ->
  clearInterval interval
  sendD()
  res.end()
  
app.get '/w', (req, res) ->
  clearInterval interval
  sendW()
  res.end()
 
console.log "Starting..."
fs.stat port, (err, stats) ->
  if err?
    console.log "Couldn't stat #{port}"
    process.exit()
 
  console.log "Started."
 
  serial = new SerialPort port, baudrate: 9600
  app.listen(8080)