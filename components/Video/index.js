var React = require('react')
var d = require('jsnox')(React)

var style = require('./video.css')

var Video = React.createClass({
  displayName: 'Video',
  render: function render () {
    return d('div', {className: style.video},
      d('img', {src: '/video.jpg'})
    )
  }
})

module.exports = Video
