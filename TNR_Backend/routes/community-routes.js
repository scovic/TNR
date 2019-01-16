const jwtService = require('../services/jwt-service')

class CommunityRoutes {
  constructor (neo4j, neo4jService, redis) {
    this.neo4j = neo4j
    this.neo4jService = neo4jService
    this.redis = redis
  }

  addCommunity (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.userId).subscribe(result => {
        if (result) {
          const community = req.body.community
          const user = req.body.user // admin, who added it

          return this.neo4jService.createCommunity(community, user)
            .then(resp => res.status(201).send({ status: 'Community added' }))
            .catch(e => res.status(400).send(e))
        } else {
          res.status(403).send({ error: 'Authorization Error. Access Denied.' })
        }
      })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  deleteCommunity (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.userId).subscribe(result => {
        if (result) {
          const objToDelete = req.body // obj must have id

          return this.neo4j.deleteNode('Community', objToDelete)
            .then(result => res.status(200).send({ status: 'Deleted' }))
            .catch(e => res.status(400).send(e))
        } else {
          res.status(403).send({ error: 'Authorization Error. Access Denied.' })
        }
      })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  updateCommunity (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.userId).subscribe(result => {
        if (result) {
          const objectToUpdate = req.body // must have id
          const idToFind = {
            id: objectToUpdate.id
          }

          return this.neo4j.updateNode('Community', idToFind, objectToUpdate)
            .then(result => res.status(200).send({ status: 'Updated successfully.' }))
            .catch(e => res.status(400).send(e))
        } else {
          res.status(403).send({ error: 'Authorization Error. Access Denied.' })
        }
      })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllCommunities (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.userId).subscribe(result => {
        if (result) {
          return this.neo4j.selectAllByLabel('Community')
            .then(result => res.status(200).send(result.records))
            .catch(e => res.status(400).send(e))
        } else {
          res.status(403).send({ error: 'Authorization Error. Access Denied.' })
        }
      })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}
module.exports.CommunityRoutes = CommunityRoutes
