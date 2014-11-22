var assert = require('assert');
var request = require('request');
var httpUtils = require('request-mocha')(request);

var server = require('../lib/server')

describe('Start the server', function() {
  before(server.start);
  this.timeout(10000);

  describe('GET /', function() {
    httpUtils.save('http://localhost:3000/');

    it ('should respond without error', function() {
      assert(this.err === null)
    });

    it ('should respond with 202 status code', function() {
      assert(this.res.statusCode === 200);
    });

    it ('should respond with "Welcome to Express"', function(){
      var pos = this.body.indexOf("Welcome to Express")
      assert(pos > -1 )
    })
  });

  after(server.stop);
});