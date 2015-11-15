var React = require('react')
var d = require('jsnox')(React)

var style = require('./video.css')

var Video = React.createClass({
  displayName: 'Video',
  render: function render () {
    return d('div', {className: style.video})
  }
})

module.exports = Video
