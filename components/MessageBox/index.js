var React = require('react')
var d = require('jsnox')(React)

var style = require('./messagebox.css')

var fakeData = [
  {type: 'status', text: 'status message'},
  {type: 'error', text: 'error message'},
  {type: 'control', text: 'beep'}
]

var MessageBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.setState({data: fakeData})
  },
  render: function render () {
    return d('div', {className: style.messagebox},
      d(MessageList, {data: this.state.data})
    )
  }
})

var MessageList = React.createClass({
  render: function () {
    var messageNodes = this.props.data.map(function (message, i) {
      return d(Message, {type: message.type, key: i}, message.text)
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
