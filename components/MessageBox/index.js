var React = require('react')
var d = require('jsnox')(React)

var MessageBox = React.createClass({
  render: function render () {
    return d('div.messageBox')
  }
})

module.exports = MessageBox
