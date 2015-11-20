var combineReducers = require('redux').combineReducers
var actions = require('./actions')
var MessageFilters = actions.MessageFilters
var assign = Object.assign
var serialShape = require('./components/Controls/serialShape')

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

function generateDefaultSp (ctlArray) {
  var usable = ctlArray.filter(function (ctl) {
    // TODO Make this more robust
    return ctl.type === 'range'
  })
  var defaults = {}
  usable.forEach(function (ctl) {
    defaults[ctl.key] = {}
    defaults[ctl.key].sp = ctl.sp
    defaults[ctl.key].pv = ctl.pv
  })
  return defaults
}

function scope (state, action) {
  var newState
  switch (action.type) {
    case 'SET_RANGE_SP':
      newState = assign({}, state)
      newState[action.key].sp = action.sp
      return newState
    case 'SET_RANGE_PV':
      newState = assign({}, state)
      newState[action.key].pv = action.pv
      return newState
    default:
      var defaultState = state || generateDefaultSp(serialShape)
      return defaultState
  }
}

const semterfaceApp = combineReducers({
  messages: messages,
  messageFilter: messageFilter,
  systemStatus: systemStatus,
  scope: scope
})

module.exports = semterfaceApp
module.exports.defaultMsgs = defaultMsgs
