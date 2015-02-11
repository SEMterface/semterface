var express = require('express')
var router = express.Router()
var persona = require('../lib/persona')('http://localhost:3000')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: "SEMterface"
  });
});

router.post('/auth/login', function(req, res) {
  console.log(req.body)
  var assertion = req.body.assertion
  persona(assertion, function(err, verificationData) {
    console.log('returned from persona');
    if (err || (verificationData.status !== 'okay')) {
      req.session.email = null; // Clear session
      req.session.assertion = null;
      return res.status(500).end('Something went wrong');
    }
    req.session.email = verificationData.email
    req.session.assertion = assertion
    res.end('You are logged in');
  })
})

module.exports = router
