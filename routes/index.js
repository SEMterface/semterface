var express = require('express')
var router = express.Router()
var gravatar = require('gravatar')
var persona = require('../lib/persona')('http://localhost:3000')

var controls = require('../serialCommands')

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'SEMterface',
    currentUser: req.session.email || null,
    avatar: gravatar.url(req.session.email, {
      s: '100',
      r: 'x',
      d: 'retro'
    }, true) || null,
    controls: controls.electron
  })
})

router.get('/scope', function(req, res){
  res.render('index', {
    title: 'SEMterface Scope View',
    currentUser: 'JOEL',
    controls: controls.electron
  })
})

router.post('/auth/login', function (req, res) {
  var assertion = req.body.assertion
  persona(assertion, function (err, verificationData) {
    console.log('returned from persona')
    console.log(verificationData)
    if (err || (verificationData.status !== 'okay')) {
      req.session.email = null // Clear session
      req.session.persona = null
      return res.status(500).end('Something went wrong')
    }
    req.session.email = verificationData.email
    req.session.persona = verificationData
    res.end('You are logged in')
  })
})

router.post('/auth/logout', function (req, res) {
  req.session.email = null // Clear session
  req.session.persona = null
  res.end('You are logged out')
})

module.exports = router
