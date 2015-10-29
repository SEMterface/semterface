var React = require('react')
var d = require('jsnox')(React)
var ReactDOM = require('react-dom')

var Header = require('./components/Header')
var Scope = require('./components/Scope')
var Footer = require('./components/Footer')

var styles = require('./index.css')

var Semterface = React.createClass({
  render: function render () {
    return d('main.semterface',
      d(Header),
      d(Scope),
      d(Footer)
    )
  }
})

ReactDOM.render(
  d(Semterface),
  document.getElementById('content')
)
