var React = require('react')
var d = require('jsnox')(React)
var ReactDOM = require('react-dom')

// tutorial1.js
var CommentBox = React.createClass({
  render: function () {
    return (
      d('div', {className: 'commentBox'}, 'Beep, world! I am a CommentBox.')
    )
  }
})
ReactDOM.render(
  d(CommentBox),
  document.body
)
