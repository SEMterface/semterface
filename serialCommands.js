exports.electron = [
  {
    code: 'ACC',
    name: 'Accel. Voltage',
    read: true,
    write: true,
    type: 'range',
    min: 0.0,
    max: 30.0,
    step: 0.1,
    maxStep: '500v/s',
    desc: 'Accelerating voltage'
  },
  {
    code: 'ACCS',
    name: 'Accel. Volt. Status',
    type: 'button',
    read: {
      'ON': {
        desc: 'Accelerating voltage is on'
      },
      'OFF_COMMAND': {
        desc: 'Accelerating voltage is off via command'
      },
      'OFF_SWITCH': {
        desc: '2nd Control pannel Accelerating Voltage switch is off'
      },
      'OFF_VAC_NG': {
        desc: 'Gun chamber has not been evacuated enough for Accelerating voltage'
      },
      'OFF_OVERV': {
        desc: 'Extraction voltage is too high'
      },
      'OFF_OVERE': {
        desc: 'Emission current is too high'
      },
      'OFF_V_LIMIT': {
        desc: 'Ratio of accelerating voltage to extraction voltage is too low'
      }
    },
    write: {
      on: {
        desc: 'turn the accelerating voltage on',
        code: 'ON'
      },
      off: {
        desc: 'turn the accelerating voltage off',
        code: 'OFF'
      }
    },
    desc: 'Accelerating voltage status'
  },
  {
    code: 'CC',
    name: 'Condenser Coarse',
    read: true,
    write: true,
    type: 'range',
    min: 1,
    max: 10,
    step: 1,
    desc: 'Reads and writes the condenser lense coarse-adjustment'
  },
  {
    code: 'CF',
    name: 'Condenser Fine',
    read: true,
    write: true,
    type: 'range',
    min: 0,
    max: 255,
    step: 1,
    desc: 'Reads and writes the condenser lense fine-adjustment'
  },
  {
    code: 'EMIS',
    name: 'Emission current (µA)',
    read: true,
    write: false,
    type: 'display',
    precision: 'dec',
    units: 'µA',
    desc: 'Reads the emission current in µA'
  },
  {
    code: 'OC',
    name: 'Objective Coarse',
    read: true,
    write: true,
    type: 'range',
    min: 0,
    max: 255,
    step: 1,
    desc: 'Reads/writes objective lense coarse adjustment'
  },
  {
    code: 'OF',
    name: 'Objective Fine',
    read: true,
    write: true,
    type: 'range',
    min: 0,
    max: 4095,
    step: 1,
    desc: 'Reads/writes objective lense fine adjustment'
  },
  {
    code: 'MG',
    name: 'Magnification',
    read: true,
    write: true,
    type: 'range',
    min: 10,
    max: 500000,
    step: 100,
    desc: 'Reads/Writes the magnification level'
  }
]
