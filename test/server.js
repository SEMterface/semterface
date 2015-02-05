var request = require('request');
var test = require('tape');

var server = require('../lib/server');

var before = test;
var after = test;

var port = 3001;

before("start the server", function(t) {
  t.plan(1);
  server.start(port, function(p) {
    t.pass('The server started on port ' + p);
  })
})

test('GET /', function(t) {
  t.plan(3);
  request('http://localhost:' + port, function(err, res, body) {
    t.equal(err, null, 'should be error free');
    t.equal(res.statusCode, 200, 'should respond with 200');
    var liveCheck = "SEMterface"
    var msg = 'should respond with "' + liveCheck + '"';
    t.assert(res.body.indexOf("SEMterface") > -1, msg);
  })
})

after("stop the server", function(t) {
  t.plan(1);
  server.stop(function() {
    t.pass('the server stopped');
  })
})
