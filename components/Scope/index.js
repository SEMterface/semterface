var React = require('react')
var d = require('jsnox')(React)

var Video = require('../Video')
var MessageBox = require('../MessageBox')
var Controls = require('../Controls')

var style = require('./scope.css')

var Scope = React.createClass({
  displayName: 'Scope',
  render: function render () {
    console.log(this.props)
    return d('div.scope', {className: style.scope},
      d('div', {className: style.mainDisplay },
        d(Video),
        d(MessageBox, {
          messages: this.props.messages,
          messageFilter: this.props.messages
        })),
      d(Controls, {
        scope: this.props.scope,
        setRangeSp: this.props.setRangeSp
      })
    )
  }
})

module.exports = Scope
