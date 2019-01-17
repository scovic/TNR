const fs = require('fs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const jwtDecode = require('jwt-decode')
const { bindNodeCallback } = require('rxjs')

const privateKey = fs.readFileSync('certs/private.key', 'utf8')
const publicKey = fs.readFileSync('certs/public.key', 'utf8')

function jwtSign (id, username) {
  return bindNodeCallback((id, username, callback) => {
    const payload = {
      userId: id,
      username: username
    }

    const i = '1553315534->nbp_proj' // token issuer
    const s = `u/${username}` // intended token user

    const signOptions = {
      issuer: i,
      subject: s,
      expiresIn: '6h',
      algorithm: 'RS256'
    }

    jwt.sign(payload, privateKey, signOptions, (err, token) => {
      err ? callback(err) : callback(null, token)
    })
  })(id, username)
}

function jwtVerify (token, sessionUserId) {
  return bindNodeCallback((token, sessionUserId, callback) => {
    const decodedToken = jwtDecode(token)
    const i = '1553315534->nbp_proj' // token issuer
    const s = `u/${decodedToken.username}` // intended token user

    const verifyOptions = {
      issuer: i,
      subject: s,
      expiresIn: '6h',
      algorithm: ['RS256']
    }

    jwt.verify(token, publicKey, verifyOptions, (err, result) => { // check if token is valid
      if (err) callback(err)
      if (result) { // now checking for valid, but stolen token
        (decodedToken.username !== sessionUserId) ? callback(err) : callback(null, true)
      }
    })
  })(token, sessionUserId)
}

function genRandomString (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length) // return required number of characters
}

function sha512 (password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value
  }
}

module.exports = {
  jwtSign: jwtSign,
  jwtVerify: jwtVerify,
  genRandomString: genRandomString,
  sha512: sha512
}
