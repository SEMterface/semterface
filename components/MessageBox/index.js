var React = require('react')
var d = require('jsnox')(React)

var style = require('./messagebox.css')

var MessageBox = React.createClass({
  displayName: 'MessageBox',
  render: function render () {
    console.log(this.props)
    return d('div', {className: style.messagebox},
      d(MessageList, {data: this.props.messages})
    )
  }
})

var MessageList = React.createClass({
  displayName: 'MessageList',
  render: function () {
    var messageNodes = this.props.data.map(function (message, i) {
      return d(Message, {type: message.type, key: i}, message.text)
    })
    return d('div.messageList', messageNodes)
  }
})

var Message = React.createClass({
  displayName: 'Message',
  render: function () {
    return (d('div.message^',
      d('span.type', this.props.type + ': '),
      this.props.children
    ))
  }
})

module.exports = MessageBox

// var end = document.querySelector('#end')
// console.log(end)
// end.scrollIntoView()
