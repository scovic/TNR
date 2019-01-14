const fs = require('fs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const jwtDecode = require('jwt-decode')

const privateKey = fs.readFileSync('certs/private.key', 'utf8')
const publicKey = fs.readFileSync('certs/public.key', 'utf8')

const jwtSign = (user, res) => {
  const payload = {
    userId: user.username
  }

  const i = 'nevena&stefan_elfak_proj' // token issuer
  const s = `u/${user.username}` // intended token user

  const signOptions = {
    issuer: i,
    subject: s,
    expiresIn: '6h',
    algorithm: 'RS256'
  }

  jwt.sign(payload, privateKey, signOptions, (err, token) => {
    err ? res.status(400).send(err) : res.status(200).send({ access_token: token })
  })
}

const jwtVerify = (username, token) => {
  const i = 'nevena&stefan_elfak_proj' // token issuer
  const s = `u/${username}` // intended token user

  const verifyOptions = {
    issuer: i,
    subject: s,
    expiresIn: '6h',
    algorithm: ['RS256']
  }

  const legit = jwt.verify(token, publicKey, verifyOptions)
  return legit
}

const verifyToken = (token) => {
  const decodedToken = jwtDecode(token)
  const legit = jwtVerify(decodedToken.userId, token)
  console.log(legit)
}

const genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length) // return required number of characters
}

const sha512 = (password, salt) => {
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
  sha512: sha512,
  verifyToken
}
