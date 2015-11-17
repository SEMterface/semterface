var test = require('tape')
var reducers = require('../reducers')
var actions = require('../actions')

test('messageFilter reducer', function (t) {
  t.plan(3)
  var i = reducers(undefined, {})
  t.ok(Array.isArray(i.messages), 'messages is an array')
  t.equal(i.messages.length, 0, 'messages is an array of length 0')
  t.equal(i.messageFilter, actions.MessageFilters.SHOW_ALL, 'has correct default message filter')
})

test('messageFilter addMessage', function (t) {
  var i = reducers(undefined, actions.addError('beep'))
  t.plan(3)
  t.equal(i.messages.length, 1, 'messages is an array of length 0')
  t.equal(i.messages[0].text, 'beep', 'has correct message text')
  t.equal(i.messages[0].msgType, 'error', 'has correct msgType')
})
