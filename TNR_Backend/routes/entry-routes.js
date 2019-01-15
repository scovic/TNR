const jwtService = require('../services/jwt-service')

class EntryRoutes {
  constructor (neo4j) {
    this.neo4j = neo4j

    this.neo4j.createConstraint('User', 'username')
      .catch(e => console.log(e))
  }

  login (req, res, next) {
    const user = req.body
    if (!user.username || !user.password) {
      res.status(400).send({ error: 'Not all login details provided' })
    }

    const findCriteria = {
      username: user.username
    }

    this.neo4j.findNode('User', findCriteria)
      .then(result => {
        const node = result.records[0].get(0).properties
        const id = result.records[0].get(0).identity.low
        if (node) {
          const salt = node.salt
          const userHash = jwtService.sha512(user.password, salt)
          if (userHash.passwordHash === node.password) {
            jwtService.jwtSign(id).subscribe(token => res.status(200).send({ access_token: token }))
          } else {
            res.status(401).send({ error: 'Invalid credentials' })
          }
        } else {
          res.status(401).send({ error: 'Invalid credentials' })
        }
      })
      .catch(e => res.status(401).send({ error: 'Invalid credentials' }))
  }

  register (req, res, next) {
    const user = req.body
    if (!user.username || !user.password || !user.email) {
      res.status(400).send({ error: 'Not all needed details provided' })
    }

    // hash & salt for user password
    const salt = jwtService.genRandomString(16) // salt of length 16
    const passwordSaltedHash = jwtService.sha512(user.password, salt)

    user.password = passwordSaltedHash.passwordHash
    user.salt = salt

    this.neo4j.createNode('User', user)
      .then(result => {
        const node = result.records[0].get(0).properties
        if (node) {
          res.status(201).send({ status: 'Successfully registered' })
        }
      })
      .catch(e => res.status(400).send({ error: e, message: 'Username already in use' }))
  }
}
module.exports.EntryRoutes = EntryRoutes
