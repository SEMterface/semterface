var React = require('react')
var d = require('jsnox')(React)

var Auth = React.createClass({
  render: function render () {
    return d('div', 'Persona')
  }
})

var Header = React.createClass({
  render: function render () {
    return d('div.header',
      d('h1', 'SEMterface'),
      d(Auth)
    )
  }
})

module.exports = Header
