'use strict'

const MessageFilters = exports.MessageFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ERROR: 'SHOW_ERROR',
  SHOW_MSG: 'SHOW_MSG'
}

function addMessageType (msgType) {
  function msgAdder (text) {
    return {
      type: 'ADD_MESSAGE',
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
    type: 'SET_MESSAGE_FILTER',
    filter: filter
  }
}
exports.setMessageFilter = setMessageFilter

function setSystemStatus (status) {
  return {
    type: 'SET_SYSTEM_STATUS',
    status: status
  }
}
exports.setSystemStatus = setSystemStatus

function setRangeSp (key, value) {
  return {
    type: 'SET_RANGE_SP',
    key: key,
    sp: value
  }
}
exports.setRange = setRangeSp
