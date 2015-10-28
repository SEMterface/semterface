var React = require('react')
var d = require('jsnox')(React)
var ReactDOM = require('react-dom')

var styles = require('./css/main.css')

// tutorial1.js
var CommentBox = React.createClass({
  render: function () {
    return (
      d(`div.commentBox.${styles.test}^`, {}, 'Beep, world! I am a commentbox.')
    )
  }
})
ReactDOM.render(
  d(CommentBox),
  document.getElementById('content')
)
