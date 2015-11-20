var Semterface = require('../components/Semterface')
var actions = require('../actions')
var MessageFilters = actions.MessageFilters
var connect = require('react-redux').connect
// Global styles applied durring app connection
var containerStyle = require('./container.css')

function filterOtherMsg (msgType) {
  return function msgFilter (message) {
    return message.msgType !== msgType
  }
}

function selectMessages (messages, filter) {
  switch (filter) {
    case MessageFilters.SHOW_ALL:
      return messages
    case MessageFilters.SHOW_ERROR:
      return messages.filter(filterOtherMsg('error'))
    case MessageFilters.SHOW_MSG:
      return messages.filter(filterOtherMsg('msg'))
  }
}

function select (state) {
  var newState = {
    visibleMessages: selectMessages(state.messages, state.messageFilter),
    messageFilter: state.messageFilter,
    systemStatus: state.systemStatus,
    scope: state.scope
  }
  return newState
}

module.exports = connect(select)(Semterface)
module.exports.style = containerStyle
