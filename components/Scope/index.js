var React = require('react')
var d = require('jsnox')(React)

var Scope = React.createClass({
  render: function render () {
    return d('div.scope')
  }
})

module.exports = Scope
