const fs = require('fs')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync('../certs/private.key', 'utf8')
const publicKey = fs.readFileSync('../certs/public.key', 'utf8')

const jwtSign = (req) => {
  // provera da li user postoji u bazi
  // ako ne postoji, vrati null

  const payload = { // moze tipa id tog usera iz baze
    userId: 'dummy'
  }

  const i = 'nevena&stefan_elfak_proj' // token issuer
  const s = `u/${req.body.username}` // intended token user

  const signOptions = {
    issuer: i,
    subject: s,
    expiresIn: '6h',
    algorithm: 'RS256'
  }

  const token = jwt.sign(payload, privateKey, signOptions)

  return token
}

const jwtVerify = (req) => {
  const i = 'nevena&stefan_elfak_proj' // token issuer
  const s = `u/${req.body.username}` // intended token user

  const verifyOptions = {
    issuer: i,
    subject: s,
    expiresIn: '6h',
    algorithm: ['RS256']
  }

  const legit = jwt.verify(req.body.token, publicKey, verifyOptions)
  return legit
}

module.exports = {
  jwtSign: jwtSign,
  jwtVerify: jwtVerify
}
