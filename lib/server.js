var debug = require('debug')('server');
var app = require('../index');
var server = app.server;
var settings = require('../settings');

function startServer (cb) {

  app.set('port', process.env.PORT || settings.port || 3000);

  server.listen(app.get('port'), function() {
      debug('Express server listening on port ' + server.address().port);
      if (cb) cb();
    });
}

function stopServer (cb) {

  var port = server.address().port;

  server.close(function() {

    debug('Express server running on port ' + port + ' closed.');
    if (cb) cb();

  });
}

exports.start = startServer;
exports.stop = stopServer;
