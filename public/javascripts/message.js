window.onload = function() {
    var upButton = document.getElementById("w");
    var downButton = document.getElementById("s");
    var rightButton = document.getElementById("d");
    var leftButton = document.getElementById("a");
    
    var socket = io.connect();
        socket.on('news', function (data) {
          console.log(data);
        });

    upButton.onclick = function() {
        socket.emit('up', { message: "text" });
    };
    downButton.onclick = function() {
        socket.emit('down', { message: "text" });
    };
    rightButton.onclick = function() {
        socket.emit('right', { message: "text" });
    };
    leftButton.onclick = function() {
        socket.emit('left', { message: "text" });
    };
}