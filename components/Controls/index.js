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

var SpMeterControl = React.createClass({
  spColor: '#267fb5',
  pvColor: '#FF410D',
  render: function render () {
    return d(BaseControl, {name: this.props.name},
      d('div', {className: style.meterContainer},
        d('div', {className: style.meterDisplayColumn},
          d(MeterDisplay,
            d(MeterScale),
            d(MeterNeedle, {color: this.spColor, key: 'sp', position: 20}),
            d(MeterNeedle, {color: this.pvColor, key: 'pv', position: 21})
          ),
          d(RangeInput)
        ),
        d('div', {className: style.numeric},
          d(TextIndicator, {color: this.spColor, name: 'pv', readOnly: true}),
          d(TextIndicator, {color: this.pvColor, name: 'sp', readOnly: false})
        )
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
