var React = require('react')
var d = require('jsnox')(React)

var style = require('./controls.css')

var Controls = React.createClass({
  render: function render () {
    return d('div.beep', {className: style.controls})
  }
})

module.exports = Controls
