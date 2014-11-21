var io = require('socket.io-client');
var $ = require('jquery');
var webrtc = require('simplewebrtc');

var socket = io.connect();
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
