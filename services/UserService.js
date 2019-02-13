const securityService = require('./Security')

function fetchAll (db, data, cb) {
  db.find({}, cb)
}
function userLogin (db, data, cb) {
  securityService.validateUserId(db, data['username'], (e, o) => {
    if (e || !o) return cb(null, o)
    securityService.validatePassword(data['password'], o.password, (isPasswordTrue) => {
      if (!isPasswordTrue) return cb(null, o)
      return securityService.createToken(o, (e, newToken) => {
        if (e || !newToken) return cb(null, o)
        else return cb(newToken, o)
      })
    })
  })
}

module.exports = {
  fetchAll,
  userLogin
}
