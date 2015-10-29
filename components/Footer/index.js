var React = require('react')
var d = require('jsnox')(React)

var Footer = React.createClass({
  render: function render () {
    return d('footer',
      d('div.vitals', 'Status: '),
      d('div.info',
        d('a', {href: 'https://github.com/SEMterface'}, 'Github')
      )
    )
  }
})

module.exports = Footer
