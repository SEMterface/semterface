var React = require('react')
var d = require('jsnox')(React)

var Header = require('../Header')
var Scope = require('../Scope')
var Footer = require('../Footer')

var styles = require('./semterface.css')

var Semterface = React.createClass({
  displayName: 'Semterface',
  render: function render () {
    return d('main', {className: styles.semterface},
      d(Header),
      d(Scope),
      d(Footer)
    )
  }
})

module.exports = Semterface
