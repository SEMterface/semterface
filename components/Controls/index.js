var React = require('react')
var d = require('jsnox')(React)

var s = require('./controls.css')

var Controls = React.createClass({
  displayName: 'Controls',
  render: function render () {
    return d('div', {className: s.controls},
      d(SpMeterControl, {name: 'SpControl'})
    )
  }
})

var SpMeterControl = React.createClass({
  displayName: 'SpMeterControl',
  render: function render () {
    return d(BaseControl, {name: this.props.name},
      d('div', {className: s.meterContainer},
        d('div', {className: s.meterDisplayColumn},
          d(MeterDisplay,
            d(MeterScale),
            d(PvMeterNeedle, {position: 20}),
            d(SpMeterNeedle, {position: 21})
          ),
          d(RangeInput)
        ),
        d('div', {className: s.numeric},
          d(TextIndicator, {name: 'pv', readOnly: true}),
          d(TextIndicator, {name: 'sp', readOnly: false})
        )
      )
    )
  }
})

var BaseControl = React.createClass({
  displayName: 'BaseControl',
  render: function render () {
    return d('div', {className: s.baseControl},
      d('div.name', this.props.name),
      this.props.children
    )
  }
})

var MeterDisplay = React.createClass({
  displayName: 'meterDisplay',
  render: function render () {
    return d('div', {className: s.meterDisplay }, this.props.children)
  }
})

var MeterScale = React.createClass({
  displayName: 'MeterScale',
  render: function render () {
    var self = this
    return d('canvas', {ref: function ref (canvas) {
        self.canvas = canvas
    }})
  },
  componentDidMount: function componentDidMount () {
    var canvas = this.canvas
    this.fitToContainer(canvas)
    this.paint(canvas)
  },
  fitToContainer: function fitToContainer (canvas) {
    // stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  },
  paint: function paint (c) {
    var wellTextColor = '#5e697d'
    var context = c.getContext('2d')
    var scalePx = 5
    var scaleDeltaPx = 40
    context.font = '12px menlo, monaco, consolas, monospace'
    context.textBaseline = 'top'
    context.textAlign = 'center'
    context.fillStyle = wellTextColor
    for (var x = scaleDeltaPx + 0.5; x <= c.width; x += scaleDeltaPx) {
      context.moveTo(x, 0)
      context.lineTo(x, scalePx)
      context.fillText(x - 0.5, x, scalePx + 0.5)
      context.moveTo(x, c.height - scalePx),
      context.lineTo(x, c.height)
    }
    context.strokeStyle = wellTextColor
    context.stroke()
  }
})

var TextIndicator = React.createClass({
  displayName: 'TextIndicator',
  render: function render () {
    return d('label',
      d('span', this.props.name),
      d('input:text', {
        readOnly: this.props.readOnly,
        style: {color: this.props.color}
      })
    )
  }
})

var RangeInput = React.createClass({
  displayName: 'RangeInput',
  render: function render () {
    return d('div', {className: s.rangeContainer},
      d('input[type=range]', {
        className: s.rangeStyle,
        value: this.props.value,
        min: this.props.min,
        max: this.props.max,
        step: this.props.step
      })
    )
  }
})

var PvMeterNeedle = React.createClass({
  displayName: 'PvMeterNeedle',
  render: function render () {
    return d(MeterNeedle, {color: s.pvColor, position: this.props.position})
  }
})

var SpMeterNeedle = React.createClass({
  displayName: 'SpMeterNeedle',
  render: function render () {
    return d(MeterNeedle, {color: s.spColor, position: this.props.position})
  }
})

var MeterNeedle = React.createClass({
  displayName: 'MeterNeedle',
  render: function render () {
    return d('div', {
      className: s.meterNeedle,
      style: {
        backgroundColor: this.props.color,
        left: this.props.position + '%'
      }
    })
  }
})

module.exports = Controls
