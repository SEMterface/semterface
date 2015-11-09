var React = require('react')
var d = require('jsnox')(React)

var style = require('./controls.css')

var Controls = React.createClass({
  render: function render () {
    return d('div', {className: style.controls},
      d(Control, {name: 'test control'})
    )
  }
})

var Control = React.createClass({
  render: function render () {
    return d('div', {className: style.control},
      d('div.name', this.props.name),
      d('div', {className: style.meterDisplay},
        d('div', {className: style.meterContainer},
          d('div', {className: style.meter},
            d('div', {className: style.pv}),
            d('div', {className: style.sp})
          ),
          d('div', {className: style.rangeContainer},
            d('input[type=range]', {className: style.spRange})
          )
        ),
        d('div', {className: style.numeric},
          d('label', {htmlFor: 'pv'}, 'pv'), d('input[type=text][readOnly]', {id: 'pv', style: {color: '#FF410D'}}),
          d('label', {htmlFor: 'sp'}, 'sp'), d('input[type=text]', {id: 'sp', style: {color: '#267fb5'}})
        )
      )
    )
  }
})

module.exports = Controls
