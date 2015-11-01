var React = require('react')
var d = require('jsnox')(React)

var Video = require('../Video')
var MessageBox = require('../MessageBox')
var Controls = require('../Controls')

var Scope = React.createClass({
  render: function render () {
    return d('div.scope',
      d('div', d(Video), d(MessageBox)),
      d(Controls))
  }
})

module.exports = Scope
