const jwtService = require('../services/jwt-service')
const jwtDecode = require('jwt-decode')

class PostRoutes {
  constructor (neo4j, neo4jService, redis) {
    this.neo4j = neo4j
    this.neo4jService = neo4jService
    this.redis = redis
  }

  getAllCommunityPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const legit = jwtService.verifyToken(token)
      if (legit) {
        const community = {
          title: req.params.community
        }

        this.neo4j.selectRelationshipByNode2('Post', 'Community', 'SUBJECT', community) // get all node1(posts) by relationship
          .then(result => res.status(200).send(result.records))
          .catch(e => res.status(400).send(e))
      } else {
        res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      }
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  addPost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const post = req.body.post // post
      const community = req.body.community // community it belongs to
      const user = req.body.user // which user added it

      this.neo4jService.createPost(post, user, community)
        .then(resp => res.status(201).send({ status: 'Post created' }))
        .catch(e => {
          console.log(e)
          res.status(400).send(e)
        })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  deletePost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const objToDelete = req.body // obj must have id

      this.neo4j.deleteNode('Post', objToDelete)
        .then(result => res.status(200).send({ status: 'Deleted' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  updatePost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const objectToUpdate = req.body // must have id
      const idToFind = {
        id: objectToUpdate.id
      }

      this.neo4j.updateNode('Post', idToFind, objectToUpdate)
        .then(result => res.status(200).send({ status: 'Updated successfully.' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  upVote (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const decodedToken = jwtDecode(header.slice(7))
      const userId = {
        id: decodedToken.userId
      }
      const post = req.body.post

      this.neo4jService.postUpVote(userId, post)
        .then(resp => res.status(200).send({ status: 'Post votes updated.' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  downVote (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const decodedToken = jwtDecode(header.slice(7))
      const userId = {
        id: decodedToken.userId
      }
      const post = req.body.post

      this.neo4jService.postDownVote(userId, post)
        .then(resp => res.status(200).send({ status: 'Post votes updated.' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}
module.exports.PostRoutes = PostRoutes
