var React = require('react')
var d = require('jsnox')(React)
var serialShape = require('./serialShape')
var assign = Object.assign

var s = require('./controls.css')

var Controls = React.createClass({
  displayName: 'Controls',
  render: function render () {
    return d('div', {className: s.controls}, generateControls(serialShape))
  }
})

function generateControls (ctlArray) {
  var ctlMap = {
    range: Range
  }

  var available = ctlArray.filter(function (ctl) {
    return ctlMap.hasOwnProperty(ctl.type)
  })

  function generateControl (ctl) {
    return d(ctlMap[ctl.type], ctl)
  }
  return available.map(generateControl)
}

var Range = React.createClass({
  displayName: 'Range',
  render: function render () {
    var scale = {
      min: this.props.min,
      max: this.props.max,
      step: this.props.step
    }
    console.log(this.pro)
    return d(BaseControl, {name: this.props.name},
      d('div', {className: s.meterContainer},
        d('div', {className: s.meterDisplayColumn},
          d(Meter,
            d(Meter.Scale, scale),
            d(Meter.Needle.Pv, assign({}, scale, {position: 55})),
            d(Meter.Needle.Sp, assign({}, scale, {position: 20}))
          ),
          d(RangeInput, scale)
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

var Meter = React.createClass({
  displayName: 'Meter',
  render: function render () {
    return d('div', {className: s.meterDisplay }, this.props.children)
  }
})

Meter.Scale = React.createClass({
  displayName: 'Meter.Scale',
  render: function render () {
    var self = this
    return d('canvas', {ref: function ref (canvas) { self.canvas = canvas }})
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
    context.font = '12px menlo, monaco, consolas, monospace'
    context.textBaseline = 'top'
    context.textAlign = 'left'
    context.fillStyle = wellTextColor
    var difference = this.props.max - this.props.min // total units
    var desiredTicks = 5
    var steps = Math.round(difference / desiredTicks) // unit steps
    var scale = c.width / difference // pixel per unit
    var deltaPx = Math.round(scale * steps) // pixels per step
    function generateLabel (x) {
      return (x * Math.pow(scale, -1)).toPrecision(3)
    }
    for (var x = 0.5; x <= c.width; x += deltaPx) {
      context.moveTo(x, 0)
      context.lineTo(x, scalePx)
      context.fillText(generateLabel(x), x, scalePx + 0.5)
      context.moveTo(x, c.height - scalePx)
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

Meter.Needle = React.createClass({
  displayName: 'Meter.Needle',
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

Meter.Needle.Pv = React.createClass({
  displayName: 'MeterNeedle.Pv',
  render: function render () {
    return d(Meter.Needle, {color: s.pvColor, position: this.props.position})
  }
})

Meter.Needle.Sp = React.createClass({
  displayName: 'Meter.Needle.Sp',
  render: function render () {
    return d(Meter.Needle, {color: s.spColor, position: this.props.position})
  }
})

module.exports = Controls
