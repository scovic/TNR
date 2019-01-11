const jwtService = require('../services/jwt-service')
const crypto = require('crypto')

class EntryRoutes {
  constructor (serverConfig, dbConfig) {
    this.serverConfig = serverConfig
    this.dbConfig = dbConfig
  }

  login (req, res, next) {
    const token = jwtService.jwtSign(req)
    token ? res.status(200).send(token) : res.status(403).send({ error: 'Not Authorized' })
  }

  genRandomString (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length) // return required number of characters
  }

  sha512 (password, salt) {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
      salt: salt,
      passwordHash: value
    }
  }

  register (req, res, next) {
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
      res.status(400).send({ error: 'Not all needed details provided' })
    }

    // hash i salt za user password
    const salt = this.genRandomString(16) // salt of length 16
    const passwordSaltedHash = this.sha512(req.body.password, salt)
    // dodaj usera u bazu, hashovan password i salt

    res.status(200).send({ status: 'Registered' })
  }
}
module.exports.EntryRoutes = EntryRoutes
