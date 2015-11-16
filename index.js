var ReactDOM = require('react-dom')
var React = require('react')
var d = require('jsnox')(React)
var createStore = require('redux').createStore
var Provider = require('react-redux')
var reducers = require('./reducers')
var Semterface = require('./components/Semterface')

var store = createStore(reducers)

var rootElement = document.getElementById('content')

ReactDOM.render(
  d(Provider, {store: store},
    d(Semterface)
  ),
  rootElement
)
