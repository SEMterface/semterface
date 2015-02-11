var io = require('socket.io-client');
var $ = require('jquery');
var SimpleWebRTC = require('simplewebrtc');
var qs = require('querystring');


var socket = io();

socket.on('connect', function(data) {
  $('#messages').append(divSystemContentElement('Connected'));
})

socket.on('connect_timeout', function(data) {
  //stuff
})

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
    $.ajax({ /* <-- This example uses jQuery, but you can use whatever you'd like */
      type: 'POST',
      url: '/auth/login', // This is a URL on your website.
      data: {
        assertion: assertion
      },
      success: function(res, status, xhr) {
        window.location.reload();
      },
      error: function(xhr, status, err) {
        navigator.id.logout();
        alert("Login failure: " + err);
      }
    });
  },
  onlogout: function() {
    $.ajax({
      type: 'POST',
      url: '/auth/logout', // This is a URL on your website.
      success: function(res, status, xhr) {
        window.location.reload();
      },
      error: function(xhr, status, err) {
        alert("Logout failure: " + err)
      }
    })
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
