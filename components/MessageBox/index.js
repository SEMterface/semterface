var React = require('react')
var d = require('jsnox')(React)

var style = require('./messagebox.css')

var MessageBox = React.createClass({
  render: function render () {
    return d('div', {className: style.messagebox})
  }
})

module.exports = MessageBox
