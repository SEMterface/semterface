'use strict'

var combineReducers = require('redux').combineReducers
var actions = require('./actions')
var MessageFilters = actions.MessageFilters
var truthy = require('@bret/truthy')

function messageFilter (state, action) {
  switch (action.type) {
    case actions.SET_MESSAGE_FILTER:
      return action.filter
    default:
      var defaultState = state || MessageFilters.SHOW_ALL
      return defaultState
  }
}

function messages (state, action) {
  var newState = Array.isArray(state) ? state.slice() : []
  switch (action.type) {
    case actions.ADD_MESSAGE:
      newState.push(
        {
          text: action.text,
          type: action.type
        }
      )
      return newState
    default:
      return newState
  }
}

const semterfaceApp = combineReducers({
  messages: messages,
  messageFilter: messageFilter
})

module.exports = semterfaceApp
