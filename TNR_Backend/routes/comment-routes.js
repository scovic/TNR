const jwtDecode = require('jwt-decode')
const jwtService = require('../services/jwt-service')

class CommentRoutes {
  constructor (neo4j, redis) {
    this.neo4j = neo4j
    this.redis = redis
  }

  getAllUserCommentedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const userId = {
        id: req.params.id
      }

      this.neo4j.selectRelationship3ByNode1('User', 'Comment', 'Post', userId, 'COMMENTED', 'ON_POST')
        .then(result => res.status(200).send(result.records))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  addComment (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const comment = req.body.comment // comment
      const post = req.body.post // post it belongs to
      const user = req.body.user // which user added it

      this.redis.add(user.id, "comments", post.id)
        .then(() =>  this.neo4j.createNode('Comment', comment))
        .then(resp => {
          let commentId = { id: resp.records[0].get(0).identity.low }
          comment.id = commentId.id
          return this.neo4j.createRelationship2Nodes('Comment', 'User', comment, user, 'COMMENTED_BY')
        })
        .then(resp => this.neo4j.createRelationship2Nodes('User', 'Comment', user, comment, 'COMMENTED'))
        .then(resp => this.neo4j.createRelationship2Nodes('Comment', 'Post', comment, post, 'ON_POST'))
        .then(resp => this.neo4j.createRelationship2Nodes('Post', 'Comment', post, comment, 'HAS_COMMENT'))
        .then(resp => res.status(201).send({ status: 'Comment added' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  deleteComment (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const objToDelete = req.body // obj must have id

      this.neo4j.deleteNode('Comment', objToDelete)
        .then(result => res.status(200).send({ status: 'Deleted' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  updateComment (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const objectToUpdate = req.body // must have id
      const idToFind = {
        id: objectToUpdate.id
      }

      this.neo4j.updateNode('Comment', idToFind, objectToUpdate)
        .then(result => res.status(200).send({ status: 'Updated successfully.' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  vote (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const obj = req.body.objectToVote
      const vote = req.body.vote.status // 0 - incr, 1 - decr

      this.neo4j.findNode('Comment', obj)
        .then(resp => {
          let votes = resp.records[0].get(0).properties.upvotes
          vote === 0 ? ++votes : --votes
          this.neo4j.updateNode('Comment', obj, { upvotes: votes })
        })
        .then(resp => res.status(200).send({ status: 'Comment votes updated.' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  
}
module.exports.CommentRoutes = CommentRoutes
