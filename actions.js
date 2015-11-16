'use strict'

const ADD_MESSAGE = exports.ADD_MESSAGE = 'ADD_MESSAGE'
const SET_MESSAGE_FILTER = exports.SET_MESSAGE_FILTER = 'SET_MESSAGE_FILTER'

const MessageFilters = exports.MessageFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ERROR: 'SHOW_ERROR',
  SHOW_STATUS: 'SHOW_STATUS',
  SHOW_CONTROL: 'SHOW_CONTROL'
}

function addMessage (msgType) {
  function msgAdder (text) {
    return {
      type: ADD_MESSAGE,
      text: text,
      msgType: msgType
    }
  }
  return msgAdder
}

exports.addError = addMessage('error')
exports.addStatus = addMessage('status')
exports.addControl = addMessage('control')

function setMessageFilter (filter) {
  return {
    type: SET_MESSAGE_FILTER,
    filter: filter
  }
}
exports.setMessageFilter = setMessageFilter
