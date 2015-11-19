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

var fakeData = [
  {msgType: 'msg', text: 'status message'},
  {msgType: 'error', text: 'error message'},
  {msgType: 'msg', text: 'beep'},
  {msgType: 'error', text: 'error two'}
]

function messages (state, action) {
  var newState = Array.isArray(state) ? state.slice() : fakeData
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
      return action.filter
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
