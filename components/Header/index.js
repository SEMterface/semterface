var React = require('react')
var d = require('jsnox')(React)

var style = require('./header.css')

var Auth = React.createClass({
  render: function render () {
    return d('div', 'Persona')
  }
})

var Header = React.createClass({
  render: function render () {
    return d('div', {className: style.header},
      d('h1', 'SEMterface'),
      d(Auth)
    )
  }
})

module.exports = Header
