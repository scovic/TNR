const jwtService = require('../services/jwt-service')

class CommentRoutes {
  constructor (neo4j, neo4jService, redis) {
    this.neo4j = neo4j
    this.neo4jService = neo4jService
    this.redis = redis
  }

  addComment (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
        if (result) {
          const comment = req.body.comment // comment
          const post = req.body.post // post it belongs to
          const user = req.body.user // which user added it

          return this.neo4jService.createComment(comment, user, post)
            .then(resp => res.status(201).send({ status: 'Comment added' }))
            .catch(e => res.status(400).send(e))
        } else {
          res.status(403).send({ error: 'Authorization Error. Access Denied.' })
        }
      })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  deleteComment (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
        if (result) {
          const objToDelete = req.body // obj must have id

          return this.neo4j.deleteNode('Comment', objToDelete)
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

  updateComment (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
        if (result) {
          const objectToUpdate = req.body // must have id
          const idToFind = {
            id: objectToUpdate.id
          }

          return this.neo4j.updateNode('Comment', idToFind, objectToUpdate)
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

  getPostComments (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
        if (result) {
          return this.neo4j.selectRelationshipByNode2('Comment', 'Post', 'ON_POST', { id: req.body.post }) // get all node1(posts) by relationship
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
module.exports.CommentRoutes = CommentRoutes
