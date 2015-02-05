var io = require('socket.io-client');
var $ = require('jquery');
var SimpleWebRTC = require('simplewebrtc');

var socket = io.connect();
socket.on('news', function(data) {
  console.log(data);
  socket.emit('my other event', {
    my: 'data'
  });
});

var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideos',
  // immediately ask for camera access
  autoRequestMedia: true
});
