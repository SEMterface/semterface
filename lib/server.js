var debug = require('debug')('server');
var argv = require('minimist')(process.argv.slice(2));

var app = require('../index');
var server = app.server;
var settings = require('../settings');


function startServer(p, cb) {
  var port = process.env.PORT || argv.p || p || settings.port || 3000
  app.set('port', port);

  server.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
    if (typeof cb === 'function') {
      cb(port)
    } else if (typeof p === 'function') {
      p(port)
    };
  });
}

function stopServer(cb) {

  var port = server.address().port;

  server.close(function() {

    debug('Express server running on port ' + port + ' closed.');
    if (typeof cb === 'function') {
      cb(port)
    } else if (typeof p === 'function') {
      p(port)
    };
  });
}

exports.start = startServer;
exports.stop = stopServer;
