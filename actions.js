'use strict'

const ADD_MESSAGE = exports.ADD_MESSAGE = 'ADD_MESSAGE'
const SET_MESSAGE_FILTER = exports.SET_MESSAGE_FILTER = 'SET_MESSAGE_FILTER'

const MessageFilters = exports.MessageFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ERROR: 'SHOW_ERROR',
  SHOW_MSG: 'SHOW_MSG',
}

function addMessageType (msgType) {
  function msgAdder (text) {
    return {
      type: ADD_MESSAGE,
      text: text,
      msgType: msgType
    }
  }
  return msgAdder
}

exports.addError = addMessageType('error')
exports.addMsg = addMessageType('msg')

function setMessageFilter (filter) {
  return {
    type: SET_MESSAGE_FILTER,
    filter: filter
  }
}
exports.setMessageFilter = setMessageFilter
