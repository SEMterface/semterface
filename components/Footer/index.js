var React = require('react')
var d = require('jsnox')(React)

var style = require('./footer.css')

var Footer = React.createClass({
  displayName: 'Footer',
  render: function render () {
    return d('footer', {className: style.footer },
      d('div.vitals', 'Status: '),
      d('div.info',
        d('a', {href: 'https://github.com/SEMterface'}, 'Github')
      )
    )
  }
})

module.exports = Footer
