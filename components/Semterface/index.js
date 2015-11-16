var React = require('react')
var PropTypes = React.PropTypes
var d = require('jsnox')(React)
var actions = require('../../actions')
var connect = require('react-redux').connect

var Header = require('../Header')
var Scope = require('../Scope')
var Footer = require('../Footer')

var styles = require('./semterface.css')

var Semterface = React.createClass({
  displayName: 'Semterface',
  render: function render () {
    return d('main', {className: styles.semterface},
      d(Header),
      d(Scope),
      d(Footer)
    )
  }
})

Semterface.propTypes = {
  visibleMessages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    msgType: PropTypes.oneOf([
      'status',
      'control',
      'error'
    ]).isRequired
  })),
  messageFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_ERROR',
    'SHOW_STATUS',
    'SHOW_CONTROL'
  ]).isRequired
}

function filterOtherMsg (type) {
  return function msgFilter (message) {
    return message.msgType !== type
  }
}

function selectMessages (messages, filter) {
  switch (filter) {
    case MessageFilters.SHOW_ALL:
      return messages
    case MessageFilters.SHOW_ERROR:
      return messages.filter(filterOtherMsg('error'))
    case MessageFilters.SHOW_STATUS:
      return messages.filter(filterOtherMsg('status'))
    case MessageFilters.SHOW_CONTROL:
      return messages.filter(filterOtherMsg('control'))
  }
}

function select (state) {
  return {
    visibleMessages: selectMessages(state.messages, state.MessageFilter),
    visibilityFilter: state.visibilityFilter
  }
}

module.exports = connect(select)(Semterface)
