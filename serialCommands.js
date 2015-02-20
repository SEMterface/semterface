exports.electron = {
  acc: {
    code: 'ACC',
    read: true,
    write: true,
    type: 'numeric',
    range: [0.0, 30.0],
    maxStep: '500v/s',
    precision: 'dec', // Decimal
    desc: 'Accelerating voltage'
  },
  accs: {
    code: 'ACCS',
    type: 'status',
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
  cc: {
    code: 'CC',
    read: true,
    write: true,
    type: 'numeric',
    precision: 'int',
    range: [1, 10],
    desc: 'Reads and writes the condenser lense coarse-adjustment'
  },
  cf: {
    code: 'CC',
    read: true,
    write: true,
    type: 'numeric',
    precision: 'int',
    range: [0, 255],
    desc: 'Reads and writes the condenser lense fine-adjustment'
  },
  emis: {
    code: 'EMIS',
    read: true,
    write: false,
    type: 'numeric',
    precision: 'dec',
    units: 'µA',
    desc: 'Reads the emission current in µA'
  },
  ga: {},
  gaa: {},
  is: {},
  lc: {},
  oc: {
    code: 'OC',
    read: true,
    write: true,
    type: 'numeric',
    precision: 'int',
    range: [0, 255],
    desc: 'Reads/writes objective lense coarse adjustment'
  },
  of: {
    code: 'OF',
    read: true,
    write: true,
    type: 'numeric',
    precision: 'int',
    range: [0, 4095],
    desc: 'Reads/writes objective lense fine adjustment'
  },
  st: {},
  stc: {},
  stsw: {},
  vext: {},
  cb: {},
  clt: {},
  da: {},
  dn: {},
  em: {},
  fll: {},
  flr: {},
  mg: {},
  pf: {},
  pmt: {},
  ps: {},
  sb: {},
  sc: {},
  sd: {},
  sp: {},
  std: {},
  sw: {},
  swxt: {},
  tb: {},
  wbl: {},
  wd: {}
}

exports.scanning = {
  dmg: {},
  imgv: {},
  insg: {},
  pcd: {},
  sm: {},
  ss: {},
  wfm: {},
  yzm: {}
}

exports.recording = {
  frez: {},
  phl: {},
  phr: {},
  pml: {}
}

exports.image = {
  ave: {},
  copy: {},
  date: {},
  dflt: {},
  dual: {},
  edit: {},
  fm: {},
  hird: {},
  hist: {},
  intg: {},
  lut: {},
  moni: {},
  parm: {},
  pnu1: {},
  pnu2: {},
  quad: {},
  slow: {},
  test: {},
  vido: {},
  auto: {},
  eos: {},
  fis: {}
}
