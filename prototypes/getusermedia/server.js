var io = require('socket.io').listen(3000);
var repl = require('repl');


var clients = {};

io.on('connection', function (client) {
    client.on('id', function (id) {
        clients[id] = client;
        client.lookup = id;
        console.log('i am ID', id);
    });

    client.on('message', function (message) {
        var otherPerson = clients[message.to];
        if (otherPerson) {
            message.from = client.lookup;
            otherPerson.emit('message', message);
        } else {
            console.log("DIDN'T FIND IT");
        }
    });
});
