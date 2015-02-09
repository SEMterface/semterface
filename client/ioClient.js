var io = require('socket.io-client');
var $ = require('jquery');
var SimpleWebRTC = require('simplewebrtc');
var qs = require('querystring');


var socket = io({
  autoConnect: false
});

socket.on('connect', function(data) {
  $('#messages').append(divSystemContentElement('Connected'));
})

socket.on('connect_timeout', function(data) {
  //stuff
})
socket
socket.on('reconnect', function(data) {
  //stuff
})

socket.on('news', function(data) {
  $('#messages').append(divSystemContentElement(data.hello));
});

socket.on('err', function(data) {
  $('#messages').append(divSystemContentElement(data));
  console.log(data);
})

socket.on('info', function(data) {
  $('#messages').append(divSystemContentElement(data));
  console.log(data);
})

var currentUser = null;

navigator.id.watch({
  loggedInUser: currentUser,
  onlogin: function(assertion) {
    console.log('ok, trying to connect')
    socket.io.opts.query = qs.stringify({
      assert: assertion
    })
    socket.connect()
  },
  onlogout: function() {
    socket.emit('logout');
  }
});

var signinLink = document.getElementById('signin');
if (signinLink) {
  signinLink.onclick = function() {
    console.log('clicked')
    navigator.id.request();
  };
}

var signoutLink = document.getElementById('signout');
if (signoutLink) {
  signoutLink.onclick = function() {
    navigator.id.logout();
  };
}

function divEscapedContentElement(message) {
  return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
  return $('<div></div>').html('<i>' + message + '</i>');
}

var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideos',
  // immediately ask for camera access
  autoRequestMedia: true
});
