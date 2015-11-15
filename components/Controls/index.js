var React = require('react')
var d = require('jsnox')(React)

var style = require('./controls.css')

var Controls = React.createClass({
  render: function render () {
    return d('div', {className: style.controls},
      d(SpMeterControl, {name: 'SpControl'})
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
          d('label', {htmlFor: 'pv'}, 'pv'),
          d('input[type=text][readOnly]', {id: 'pv', style: {color: '#FF410D'}}),
          d('label', {htmlFor: 'sp'}, 'sp'),
          d('input[type=text]', {id: 'sp', style: {color: '#267fb5'}})
        )
      )
    )
  }
})

var SpMeterControl = React.createClass({
  render: function render () {
    return d(BaseControl, {name: this.props.name},
      d('div', {className: style.meterContainer},
        d(MeterDisplay,
          d(MeterScale),
          d(MeterNeedle, {color: '#267fb5', key: 'sp', position: 20}),
          d(MeterNeedle, {color: '#FF410D', key: 'pv', position: 21})
        ),
        d(TextIndicator, {color: '#267fb5', name: 'pv', readOnly: true}),
        d(TextIndicator, {color: '#FF410D', name: 'sp', readOnly: false})
      )
    )
  }
})

var BaseControl = React.createClass({
  render: function render () {
    return d('div', {className: style.baseControl},
      d('div.name', this.props.name),
      this.props.children
    )
  }
})

var MeterDisplay = React.createClass({
  render: function render () {
    return d('div', {className: style.meterDisplay }, this.props.children)
  }
})

var MeterScale = React.createClass({
  componentDidMount: function componentDidMount () {
    var canvas = this.getDOMNode()
    this.fitToContainer(canvas)
    this.paint(canvas)
  },
  fitToContainer: function fitToContainer (canvas) {
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  },
  paint: function paint (c) {
    var context = c.getContext('2d')
    for (var x = 10.5; x <= c.width; x += 10) {
      context.moveTo(x, 0)
      context.lineTo(x, c.height)
    }
    for (var y = 10.5; y <= c.height; y += 10) {
      context.moveTo(0, y)
      context.lineTo(c.width, y)
    }
    context.strokeStyle = '#eee'
    context.stroke()
  },
  render: function render () {
    return d('canvas')
  }
})

var TextIndicator = React.createClass({
  render: function render () {
    return d('label', this.props.name,
      d('input[type=text]', {readOnly: this.props.readOnly,  style: {color: this.props.color}})
    )
  }
})

var RangeInput = React.createClass({
  render: function render () {
    return d('div', {className: style.rangeContainer},
      d('input[type=range]', {
        className: style.rangeStyle,
        value: this.props.value,
        min: this.props.min,
        max: this.props.max,
        step: this.props.step
      })
    )
  }
})

var MeterNeedle = React.createClass({
  render: function render () {
    return d('div', {
      className: style.meterNeedle,
      style: {
        backgroundColor: this.props.color,
        left: this.props.position + '%'
      }
    })
  }
})

module.exports = Controls
