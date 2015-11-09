var ReactDOM = require('react-dom')
var React = require('react')
var d = require('jsnox')(React)

var styles = require('./index.css')

var Semterface = require('./components/Semterface')

var containerStyle = require('./index.css')

ReactDOM.render(
  d(Semterface),
  document.getElementById('content')
)

//var end = document.querySelector('#end')
//console.log(end)
//end.scrollIntoView()
