const _ = require('lodash')
const Jwt = require('jsonwebtoken')
const TokenExtractor = require('./tokenExtractor')
// const Config = require('../config')
// const Logger = require('./logger')

var signToken = function (payload, clientSecret) {
  return new Promise(function (resolve, reject) {
    // Get the secret.
    var clientSecret = 'secretKey123'
    var secret
    // if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'fakeServer') {
    //   secret = new Buffer(clientSecret)
    // } else {
    secret = clientSecret
    // secret = new Buffer(clientSecret, 'base64')
    // }

    try {
      const token = Jwt.sign(payload, secret, { algorithm: 'HS256' })
      return resolve(token)
      // Jwt.sign(payload, secret, { algorithms: ['HS256'] }, function (signedToken) {
      //   // return the signed token
      //   return resolve(signedToken);
      // });
    } catch (err) {
      // Logger.log(['jwt', 'error'], { error: err, msg: 'Authorization Token could not be signed', payload: payload })
      reject(err)
    }
  })
}

var msisdnFromToken = function (authHeader) {
  var token = TokenExtractor(authHeader)
  var payload = Jwt.decode(token)

  return payload && payload.profile && payload.profile.msisdn || null
}
var objFromToken = function (authHeader, obj) {
  var token = TokenExtractor(authHeader)
  var payload = Jwt.decode(token)

  return payload && (payload[obj] || null)
}

var fingerPrintFromToken = function (authHeader) {
  var token = TokenExtractor(authHeader)
  var payload = Jwt.decode(token)

  return payload && payload.profile && payload.fingerPrint || null
}

var userIdFromToken = function (authHeader) {
  var token = TokenExtractor(authHeader)
  var payload = Jwt.decode(token)

  return payload && payload.profile && payload.sub || null
}

var extendToken = function (payload, clientSecret) {
  return signToken(_.extend({}, payload), clientSecret)
}

var promoteToken = function (payload, profile, clientSecret) {
  return signToken(_.extend({}, payload, profile), clientSecret)
}

module.exports = {
  extendToken: extendToken,
  promoteToken: promoteToken,
  msisdnFromToken: msisdnFromToken,
  fingerPrintFromToken: fingerPrintFromToken,
  userIdFromToken: userIdFromToken,
  objFromToken: objFromToken
}
