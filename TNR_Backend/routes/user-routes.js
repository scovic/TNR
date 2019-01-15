const jwtDecode = require('jwt-decode')
const jwtService = require('../services/jwt-service')

class UserRoutes {
  constructor(redis) {
    this.redis = redis;
  }

  getAll(req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId 
      
      this.redis.getMultiple(id, "posts", "comments", "upvotes", "downvotes")
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserPosts(req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId 
      
      this.redis.getOne(id, "posts")
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserUpvotedPosts(req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId 
      
      this.redis.getOne(id, "upvotes")
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserDownvotedPosts(req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId 
      
      this.redis.getOne(id, "downvotes")
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserCommentedPosts(req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      this.redis.getOne(id, "comments")
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  savePost(req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      const postId = req.body.postId

      this.redis.add(id, "savedPosts")
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserSavedPosts(req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId

      this.redis.getOne(id, "savedPosts")
        .then((result) => res.status(200).send(result))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}

module.exports.UserRoutes = UserRoutes