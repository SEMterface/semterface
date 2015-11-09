var React = require('react')
var d = require('jsnox')(React)

var style = require('./messagebox.css')

var MessageBox = React.createClass({
  render: function render () {
    return d('div', {className: style.messagebox},
      d(MessageList, {data: this.props.data})
    )
  }
})

var MessageList = React.createClass({
  render: function () {
    var messageNodes = this.props.data.map(function (message, index) {
      return d(Message, {type: message.type, key: index}, message.text)
    })
    return d('div.messageList', messageNodes)
  }
})

var Message = React.createClass({
  render: function () {
    return (d('div.message^',
      d('span.type', this.props.type + ': '),
      this.props.children
    ))
  }
})

module.exports = MessageBox
