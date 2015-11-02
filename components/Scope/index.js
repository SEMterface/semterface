var React = require('react')
var d = require('jsnox')(React)

var Video = require('../Video')
var MessageBox = require('../MessageBox')
var Controls = require('../Controls')

var style = require('./scope.css')

var data = [
  {type: 'status', text: 'status message'},
  {type: 'error', text: 'error message'},
  {type: 'control', text: 'beep'}
]

var Scope = React.createClass({
  render: function render () {
    return d('div.scope', {className: style.scope},
      d('div', {className: style.mainDisplay },
        d(Video), d(MessageBox, {data: data})),
      d(Controls)
    )
  }
})

module.exports = Scope
