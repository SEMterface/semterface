var combineReducers = require('redux').combineReducers
var actions = require('./actions')
var MessageFilters = actions.MessageFilters

function messageFilter (state, action) {
  switch (action.type) {
    case 'SET_MESSAGE_FILTER':
      return action.filter
    default:
      var defaultState = state || MessageFilters.SHOW_ALL
      return defaultState
  }
}

var defaultMsgs = [
  {msgType: 'msg', text: 'status message'},
  {msgType: 'error', text: 'error message'}
]

function messages (state, action) {
  var newState = Array.isArray(state) ? state.slice() : defaultMsgs
  switch (action.type) {
    case 'ADD_MESSAGE':
      newState.push(
        {
          text: action.text,
          msgType: action.msgType
        }
      )
      return newState
    default:
      return newState
  }
}

function systemStatus (state, action) {
  switch (action.type) {
    case 'SET_SYSTEM_STATUS':
      return action.status
    default:
      return 'Offline'
  }
}

const semterfaceApp = combineReducers({
  messages: messages,
  messageFilter: messageFilter,
  systemStatus: systemStatus
})

module.exports = semterfaceApp
module.exports.defaultMsgs = defaultMsgs
