var io = require('socket.io-client');
var $ = require('jquery');

var socket = io();

socket.on('connect', function(data) {
  $('#messages').append(divSystemContentElement('Connected'));
})

socket.on('connect_timeout', function(data) {
  $('#messages').append(divSystemContentElement(data));
})

socket.on('reconnect', function(data) {
  $('#messages').append(divSystemContentElement(data));
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

var currentUser = $("#currentUser").text() || null;
console.log("currentUser: " + currentUser);

navigator.id.watch({
  loggedInUser: currentUser,
  onlogin: function(assertion) {
    $.ajax({
      type: 'POST',
      url: '/auth/login', // This is a URL on your website.
      data: {
        assertion: assertion
      },
      success: function(res, status, xhr) {
        $('#messages').append(divSystemContentElement(res));
        window.location.reload();
      },
      error: function(xhr, status, err) {
        navigator.id.logout();
        $('#messages').append(divSystemContentElement(err));
      }
    });
  },
  onlogout: function() {
    $.ajax({
      type: 'POST',
      url: '/auth/logout', // This is a URL on your website.
      success: function(res, status, xhr) {
        $('#messages').append(divSystemContentElement(res));
        window.location.reload();
      },
      error: function(xhr, status, err) {}
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
