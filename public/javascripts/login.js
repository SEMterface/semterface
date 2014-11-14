var logIn = document.getElementById('login')

var signinLink = document.createElement('a');
signinLink.className = "persona-button dark"
var signinLinkSpan = document.createElement('span');
var signinLinkText = document.createTextNode('Sign In');
signinLinkSpan.appendChild(signinLinkText);
signinLink.appendChild(signinLinkSpan);
signinLink.onclick = function() { navigator.id.request(); };
var signoutLink = document.createElement('a');
signoutLink.className = "persona-button dark"
var signoutLinkSpan = document.createElement('span');
var signoutLinkText = document.createTextNode('Sign Out');
signoutLinkSpan.appendChild(signoutLinkText);
signoutLink.appendChild(signoutLinkSpan);
signoutLink.onclick = function() { navigator.id.request(); };

logIn.appendChild(signinLink);
var currentUser = null;

navigator.id.watch({
  loggedInUser: currentUser,
  onlogin: function(assertion) {
    socket.emit('login', {assertion: assertion});
    logIn.removeChild(signinLink);
    logIn.appendChild(signoutLink);
  },
  onlogout: function() {
    socket.emit('logout');
  }
});


socket.on('logincb', function(data) {
  console.log(data);
  currentUser = data.email;
})

socket.on('logout', function(data) {
  console.log(data);
  logIn.removeChild(signoutLink);
  logIn.appendChild(signinLink);
  currentUser = null;
})
