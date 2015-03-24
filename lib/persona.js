var request = require('request')

var personaUrl = 'https://verifier.login.persona.org/verify'

// audience "https://semterface.herokuapp.com"

module.exports = function persona (audience) {
  return function validate (assertion, cb) {
    console.log('assertion: ' + assertion)
    var options = {
      method: 'POST',
      url: personaUrl,
      qs: {
        assertion: assertion,
        audience: audience || 'https://semterface.herokuapp.com'
      }
    }

    request(options, function (err, res, body) {
      if (err) return cb(err)
      var verificationData = JSON.parse(body)
      cb(err, verificationData)
    })
  }
}
