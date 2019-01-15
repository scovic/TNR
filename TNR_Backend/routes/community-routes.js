const jwtService = require('../services/jwt-service')
const jwtDecode = require('jwt-decode')

class CommunityRoutes {
  constructor (neo4j, neo4jService, redis) {
    this.neo4j = neo4j
    this.neo4jService = neo4jService
    this.redis = redis
  }

  addCommunity (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const community = req.body.community
      const user = req.body.user // admin, who added it

      this.neo4jService.createCommunity(community, user)
        .then(resp => res.status(201).send({ status: 'Community added' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  deleteCommunity (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const objToDelete = req.body // obj must have id

      this.neo4j.deleteNode('Community', objToDelete)
        .then(result => res.status(200).send({ status: 'Deleted' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  updateCommunity (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const objectToUpdate = req.body // must have id
      const idToFind = {
        id: objectToUpdate.id
      }

      this.neo4j.updateNode('Community', idToFind, objectToUpdate)
        .then(result => res.status(200).send({ status: 'Updated successfully.' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllCommunities (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      this.neo4j.selectAllByLabel('Community')
        .then(result => res.status(200).send(result.records))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getUserCommunities (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decoded = jwtDecode(token)
      const legit = jwtService.verifyToken(token)
      if (legit) {
        this.neo4j.selectRelationshipByNode2('Community', 'User', 'SUBSCRIBER', { id: decoded.userId }) // get all node1(posts) by relationship
          .then(result => res.status(200).send(result.records))
          .catch(e => res.status(400).send(e))
      } else {
        res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      }
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}
module.exports.CommunityRoutes = CommunityRoutes
