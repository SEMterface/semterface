var React = require('react')
var d = require('jsnox')(React)

var Video = require('../Video')
var MessageBox = require('../MessageBox')
var Controls = require('../Controls')

var style = require('./scope.css')

var Scope = React.createClass({
  displayName: 'Scope',
  render: function render () {
    return d('div.scope', {className: style.scope},
      d('div', {className: style.mainDisplay },
        d(Video), d(MessageBox)),
      d(Controls)
    )
  }
})

module.exports = Scope
