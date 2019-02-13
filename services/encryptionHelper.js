// const Crypto = require('crypto');
const Crypto = require('crypto')
// const listalgo = require('../assets/algorithms.json');
const Config = require('../config')

const hexToBase64 = (str) => {
  return new Buffer(str, 'hex').toString('base64')
}
const base64ToHex = (str) => {
  return new Buffer(str, 'base64').toString('hex')
}
const utf8ToHex = (str) => {
  return new Buffer(str, 'utf-8').toString('hex')
}
const hexToUtf8 = (str) => {
  return new Buffer(str, 'hex').toString('utf-8')
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
const encryptAuthHeader = (authHeader) => {
  const cipherAlgorithm = Config.get('/auth0/encryption/cipherAlgorithm')
  // console.log(cipherAlgorithm );
  const cipherPassword = Config.get('/auth0/cipherPassword')
  authHeader = pading(authHeader)
  var cipher = Crypto.createCipheriv(cipherAlgorithm, cipherPassword, cipherPassword)
  var cipheredAuthHeaderHEX = cipher.update(authHeader, 'utf-8', 'hex') // + cipher.final('hex');
  return hexToBase64(cipheredAuthHeaderHEX)
}
const decryptAuthHeader = (cipheredAuthHeaderBase64) => {
  const cipherAlgorithm = Config.get('/auth0/encryption/cipherAlgorithm')
  // console.log(cipherAlgorithm );
  const cipherPassword = Config.get('/auth0/cipherPassword')
  var strHex = base64ToHex(cipheredAuthHeaderBase64)
  var decipher = Crypto.createDecipheriv(cipherAlgorithm, cipherPassword, cipherPassword)
  return unpading(decipher.update(strHex, 'hex', 'utf-8')) // + decipher.final('utf-8');
}

module.exports = {
  hexToBase64: hexToBase64,
  base64ToHex: base64ToHex,
  utf8ToHex: utf8ToHex,
  hexToUtf8: hexToUtf8,
  pading: pading,
  unpading: unpading,
  encryptAuthHeader: encryptAuthHeader,
  decryptAuthHeader: decryptAuthHeader
}
