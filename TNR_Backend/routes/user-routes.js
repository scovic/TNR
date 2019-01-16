const jwtDecode = require('jwt-decode')

class UserRoutes {
  constructor (redis, neo4j) {
    this.neo4j = neo4j
    this.redis = redis
  }

  getAll (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      return this.redis.getMultiple(id, 'posts', 'comments', 'upvotes', 'downvotes')
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      return this.redis.getOne(id, 'posts')
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserUpvotedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      return this.redis.getOne(id, 'upvotes')
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserDownvotedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      return this.redis.getOne(id, 'downvotes')
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserCommentedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      return this.redis.getOne(id, 'comments')
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  savePost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      const postId = req.body.postId

      return this.redis.add(id, 'savedPosts', postId)
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserSavedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      return this.redis.getOne(id, 'savedPosts')
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  subscribe (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const userId = {
        id: decodedToken.userId
      }

      return this.neo4j.createRelationship2Nodes('User', 'Community', userId, req.body, 'FOLLOWING')
        .then(() => this.neo4j.createRelationship2Nodes('Community', 'User', req.body, userId, 'SUBSCRIBER'))
        .then(() => res.status(200).send({ status: 'Success' }))
        .catch(e => res.status(400).send(e))
    }
  }

  getUserCommunities (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decoded = jwtDecode(token)
      // const legit = jwtService.verifyToken(token)
      // if (legit) {
      return this.neo4j.selectRelationshipByNode2('Community', 'User', 'SUBSCRIBER', { id: decoded.userId }) // get all node1(posts) by relationship
        .then(result => res.status(200).send(result.records))
        .catch(e => res.status(400).send(e))
      // } else {
      // res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      // }
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getRecommendedCommunities (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const obj = req.body

      return this.neo4j.selectMultipleRelationshipByNode1('Community', 'User', 'Community', obj, 'SUBSCRIBER', 'SUBSCRIBER')
        .then(result => {
          let set = []
          result.records.forEach((el, ind) => {
            if (set.indexOf(el._fields) === -1) {
              set = [...set, el._fields]
            }
          })
          console.log(set)
          // FILTRIRAJ SET
          res.status(200).send(set)
        })
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}

module.exports.UserRoutes = UserRoutes
