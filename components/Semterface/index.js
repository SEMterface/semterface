var React = require('react')
var PropTypes = React.PropTypes
var d = require('jsnox')(React)
var actions = require('../../actions')
var MessageFilters = actions.MessageFilters
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
  messageFilter: PropTypes.oneOf(Object.keys(MessageFilters)).isRequired
}

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
  return {
    visibleMessages: selectMessages(state.messages, state.messageFilter),
    messageFilter: state.messageFilter
  }
}

module.exports = connect(select)(Semterface)
