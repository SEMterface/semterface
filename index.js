var ReactDOM = require('react-dom')
var React = require('react')
var d = require('jsnox')(React)
var createStore = require('redux').createStore
var Provider = require('react-redux').Provider
var reducers = require('./reducers')
var Container = require('./containers/app')

var store = createStore(reducers)

var rootElement = document.getElementById('content')

ReactDOM.render(
  d(Provider, {store: store},
    d(Container)
  ),
  rootElement
)

exports.reducer = reducers
exports.container = Container
