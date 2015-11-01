var React = require('react')
var d = require('jsnox')(React)

var Scope = React.createClass({
  render: function render () {
    return d('div.messageBox')
  }
})

module.exports = MessageBox
