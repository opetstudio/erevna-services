// const Ramda = require('ramda')
// const path = Ramda.path
const Crypto = require('crypto')
const JwtHelper = require('./jwtHelper')
const Moment = require('moment')
const Jwt = require('jsonwebtoken')

const errorCode = {
  'NO_AUTHORIZATION_HEADER_PRESENT': {

  }
}
function md5 (str) {
  return Crypto.createHash('md5').update(str).digest('hex')
}
function generateSalt () {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
  var salt = ''
  for (var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length)
    salt += set[p]
  }
  return salt
}
var encryptPassword = (password, callback) => {
  var salt = generateSalt()
  var encPass = salt + md5(password + salt)
  callback(encPass)
}
var validatePassword = (plainPass, hashedPass, callback) => {
  let resp = false
  if (!plainPass) return callback(resp)
  var salt = hashedPass.substr(0, 10)
  var validHash = salt + md5(plainPass + salt)
  resp = hashedPass === validHash
  callback(resp)
}
function validateUserId (db, userId, cb) {
  console.log('validateUserId|userId=', userId)
  db.findOne({ $or: [{ username: userId }, { email: userId }, { msisdn: userId }] }, (e, o) => {
    return cb(e, o)
  })
}
var validateAccessToken = (accessToken) => {
  return true
}
const pading = (s) => {
  // return s + (bs - len(s) % bs) * chr(bs - len(s) % bs)
  const bs = 16
  return `${s}${Array(bs - s.length % bs + 1).join(String.fromCharCode(bs - s.length % bs))}`
}
const unpading = (padingedStr) => {
  // s[:-ord(s[len(s)-1:])]
  return padingedStr.slice(0, -(padingedStr.length - (padingedStr.indexOf(padingedStr.slice(-1)))))
}
const hexToBase64 = (str) => {
  return Buffer.from(str, 'hex').toString('base64')
}
const base64ToHex = (str) => {
  return Buffer.from(str, 'base64').toString('hex')
}
const utf8ToHex = (str) => {
  return Buffer.from(str, 'utf-8').toString('hex')
}
const hexToUtf8 = (str) => {
  return Buffer.from(str, 'hex').toString('utf-8')
}

// , cipherAlgorithm=aes-128-ofb, cipherPassword=asdfasfadsf
const encryptAuthHeader = (authHeader, cipherAlgorithm, cipherPassword) => {
  // const cipherAlgorithm = Config.get('/auth0/encryption/cipherAlgorithm')
  // console.log(cipherAlgorithm );
  // const cipherPassword = Config.get('/auth0/cipherPassword')
  authHeader = pading(authHeader)
  var cipher = Crypto.createCipheriv(cipherAlgorithm, cipherPassword, cipherPassword)
  var cipheredAuthHeaderHEX = cipher.update(authHeader, 'utf-8', 'hex') // + cipher.final('hex');
  return hexToBase64(cipheredAuthHeaderHEX)
}

const decryptAuthHeader = (cipheredAuthHeaderBase64, cipherAlgorithm, cipherPassword) => {
  // const cipherAlgorithm = Config.get('/auth0/encryption/cipherAlgorithm')
  // console.log(cipherAlgorithm );
  // const cipherPassword = Config.get('/auth0/cipherPassword')
  var strHex = base64ToHex(cipheredAuthHeaderBase64)
  var decipher = Crypto.createDecipheriv(cipherAlgorithm, cipherPassword, cipherPassword)
  return unpading(decipher.update(strHex, 'hex', 'utf-8')) // + decipher.final('utf-8');
}
// {status: true, o}
const createToken = (userDetail, cb) => {
  var clientSecret = 'secretKey123'
  // const userDetail = path(['o', 'resp', 'userDetail'], resp)
  return JwtHelper.promoteToken({ id: userDetail._id, email: userDetail.email }, userDetail, clientSecret).then(promotedToken => {
    const tk = promotedToken
    // const tk = 'Bearer ' + promotedToken
    return cb(null, tk)
    // const response = h.response({o: {resp: {token: tk, userDetail}}})
    // _logger.info('set Response header authorization:', tk)
    // response.header('Authorization', tk)
    // return response
  }).catch(err => {
    cb(err, null)
  })
}

// Exports a single function which extracts a 'bearer' token
// from an authoriziation header.
function tokenExtractor (header) {
  // Remove the Bearer prefix and extract the token
  var regex = /.*[b|B]earer(?:\s+)(\S+)/

  // Execute and grab the first capture group.
  var result = regex.exec(header)
  return result ? result[1] : false
}

function authAuthorizationToken (request, callback) {
  let authorization = request.authorization
  let channelid = request.channelid
  let clientSecret = 'secretKey123'
  let secret = clientSecret
  // let secret = new Buffer('xxxxx', 'base64')
  let timeDiffValidity = 100
  // let timeDiffValidity = Config.get('/auth0/encryption/validity')

  if (!authorization) {
    let response = 'NO_AUTHORIZATION_HEADER_PRESENT'
    return callback(response)
  }
  let encryptedAuthHeader = tokenExtractor(authorization)
  if (!encryptedAuthHeader) {
    let response = 'INVALID_AUTHORIZATION_TOKEN'
    return callback(response)
  }
  let token = encryptedAuthHeader
  // secret = new Buffer(clientSecret, 'base64')
  if (channelid === 'WEB') {
    secret = Buffer.from(clientSecret, 'base64')
    let decryptedAuthHeader = decryptAuthHeader(encryptedAuthHeader)
    // Parse the header to JSON format
    let authHeader = JSON.parse(decryptedAuthHeader)
    // Check the JSON object for mandatory keys
    if (!authHeader.timestamp || !authHeader.token) {
      // Logger.info(['auth', 'validation', 'error'], { msg: 'Missing Keys in Token', header: encryptedAuthHeader })
      let response = 'INVALID_AUTHORIZATION_TOKEN'
      return callback(response)
    }

    // The AuthHeader Timestamp is in UTC format
    // Time at which the request was initiated
    var requestTimestamp = Moment(authHeader.timestamp)
    // Get the current timestamp in UTC format
    // Time at which the request was received
    var currentTimestamp = Moment.utc()
    // Time difference between time since request was initiated and received
    var timeDiff = currentTimestamp.diff(requestTimestamp, 's')

    if (timeDiff > timeDiffValidity) {
      // Logger.info(['auth', 'validation', 'error'], { msg: 'Token Expired', header: encryptedAuthHeader })
      let response = 'TOKEN_EXPIRED'
      return callback(response)
    }
    // Extract the token
    token = authHeader.token
  }

  if (!secret) {
    let response = 'TOKEN_MISUSE'
    return callback(response)
  }

  // Now check the signature of the token.
  // NEVER trust the signing method of the token, we MUST use HS256.
  // See: https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/
  // The above is why you've got to be super-careful with this code.
  // get the clientId (aud) from token
  // var decodedToken = Jwt.decode(token)
  // var cb = (p) => {
  //   // Logger.info('cbbbb===>>>>', p)
  //   var tk = 'Bearer ' + token
  //   // Logger.info('token ori: ', tk)
  //   // request.headers.authorization = tk
  //   // return h.authenticated({ credentials: p })
  //   }
  // console.log(`jwt verify secret=${secret}<===>token=${token}`)
  return Jwt.verify(token, secret, { algorithms: ['HS256'] }, function (err, payload) {
    if (err) {
      console.log('error jwt verify=', err)
      // if using old client id then log the user out on the front end by sending 400 - Old Token (after upgrade to 3.7.1)
      // if (request.headers.channelid === 'UX' && aud === Config.get('/auth0/clientId')) {
      //   Logger.info(['jwt', 'error'], { error: err, msg: 'Invalid Authorization token - Mobile from old clientId', token: token });
      //   throw Boom.badRequest('Old Token')
      // }
      // Logger.info(['jwt', 'error'], { error: err, msg: 'Invalid Authorization token', token: token })
      let response = 'AUTHORIZATION_TOKEN_INVALID'
      return callback(response)
    }
    // request.headers.session = JSON.stringify(payload)
    return callback(null, { authorization: 'Bearer ' + token, credentials: JSON.stringify(payload) })
  })
}

module.exports = {
  authAuthorizationToken,
  tokenExtractor,
  validateAccessToken,
  validatePassword,
  pading,
  unpading,
  encryptAuthHeader,
  decryptAuthHeader,
  hexToBase64: hexToBase64,
  base64ToHex: base64ToHex,
  utf8ToHex: utf8ToHex,
  hexToUtf8: hexToUtf8,
  createToken,
  validateUserId,
  encryptPassword
}
