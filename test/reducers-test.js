var test = require('tape')
var reducers = require('../reducers')
var defaultMsgs = reducers.defaultMsgs
var actions = require('../actions')
var MessageFilters = actions.MessageFilters

test('messageFilter reducer', function (t) {
  t.plan(4)
  var i = reducers(undefined, {})
  t.ok(Array.isArray(i.messages), 'messages is an array')
  t.equal(i.messages.length, defaultMsgs.length, 'messages is an array of length 0')
  t.equal(i.messageFilter, MessageFilters.SHOW_ALL, 'has correct default message filter')
  i = reducers(undefined, actions.setMessageFilter(MessageFilters.SHOW_MSG))
  t.equal(i.messageFilter, MessageFilters.SHOW_MSG, 'message filter set')
})

test('messageFilter addError', function (t) {
  var i = reducers(undefined, actions.addError('beep'))
  var expectedLength = defaultMsgs.length
  t.plan(3)
  t.equal(i.messages.length, expectedLength, 'messages is an array of length ' + expectedLength)
  t.equal(i.messages[expectedLength - 1].text, 'beep', 'has correct message text')
  t.equal(i.messages[expectedLength - 1].msgType, 'error', 'has correct msgType')
})

test('messageFilter addMsg', function (t) {
  var i = reducers(undefined, actions.addMsg('beep'))
  var expectedLength = defaultMsgs.length
  t.plan(3)
  t.equal(i.messages.length, expectedLength, 'messages is an array of length ' + expectedLength)
  t.equal(i.messages[expectedLength - 1].text, 'beep', 'has correct message text')
  t.equal(i.messages[expectedLength - 1].msgType, 'msg', 'has correct msgType')
})
