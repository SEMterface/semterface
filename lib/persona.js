var request = require('request')

var personaUrl = 'https://verifier.login.persona.org/verify'

//audience "https://semterface.herokuapp.com"

module.exports = function(audience) {
  return function validate(assert, cb) {
    console.log('assert: ' + assert);
    var options = {
      method: 'POST',
      url: personaUrl,
      qs: {
        assertion: assert,
        audience: audience || "https://semterface.herokuapp.com"
      }
    }

    request(options, function(err, res, body) {
      console.log(err)
      console.log(res)
      console.log(body)
      if (err) return cb(err);


      var info = JSON.parse(body);

      cb(err, info.status === "okay", info)
    })
  }
}
