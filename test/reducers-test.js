var test = require('tape')
var reducers = require('../reducers')
var actions = require('../actions')

test('messageFilter reducer', function (t) {
  t.plan(4)
  var i = reducers(undefined, {})
  t.ok(Array.isArray(i.messages), 'messages is an array')
  t.equal(i.messages.length, 0, 'messages is an array of length 0')
  t.equal(i.messageFilter, actions.MessageFilters.SHOW_ALL, 'has correct default message filter')
  i = reducers(undefined, actions.setMessageFilter(actions.MessageFilters.SHOW_MSG))
  t.equal(i.messageFilter, actions.MessageFilters.SHOW_MSG, 'message filter set')
})


test('messageFilter addError', function (t) {
  var i = reducers(undefined, actions.addError('beep'))
  t.plan(3)
  t.equal(i.messages.length, 1, 'messages is an array of length 0')
  t.equal(i.messages[0].text, 'beep', 'has correct message text')
  t.equal(i.messages[0].msgType, 'error', 'has correct msgType')
})

test('messageFilter addMsg', function (t) {
  var i = reducers(undefined, actions.addMsg('beep'))
  t.plan(3)
  t.equal(i.messages.length, 1, 'messages is an array of length 0')
  t.equal(i.messages[0].text, 'beep', 'has correct message text')
  t.equal(i.messages[0].msgType, 'msg', 'has correct msgType')
})
