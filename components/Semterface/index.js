var React = require('react')
var PropTypes = React.PropTypes
var d = require('jsnox')(React)
var actions = require('../../actions')
var MessageFilters = actions.MessageFilters

var Header = require('../Header')
var Scope = require('../Scope')
var Footer = require('../Footer')

var s = require('./semterface.css')

var Semterface = React.createClass({
  displayName: 'Semterface',
  render: function render () {
    var dispatch = this.props.dispatch
    return d('main', {className: s.semterface},
      d(Header),
      d(Scope, {
        messages: this.props.visibleMessages,
        messageFilter: this.props.messageFilter,
        scope: this.props.scope,
        setRangeSp: function setRangeSp (key, value) {
          dispatch(actions.setRangeSp(key, value))
        }
      }),
      d(Footer, {
        status: this.props.systemStatus
      })
    )
  },
  propTypes: {
    visibleMessages: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      msgType: PropTypes.oneOf([
        'msg',
        'error'
      ]).isRequired
    })),
    messageFilter: PropTypes.oneOf(Object.keys(MessageFilters)).isRequired,
    systemStatus: PropTypes.string.isRequired
  }
})

module.exports = Semterface
