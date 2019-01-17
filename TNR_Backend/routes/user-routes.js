const jwtDecode = require('jwt-decode')
// const jwtService = require('../services/jwt-service')

class UserRoutes {
  constructor (redis, neo4j, neo4jService) {
    this.neo4j = neo4j
    this.redis = redis
    this.neo4jService = neo4jService
  }

  getAllUserActivity (req, res, next, me) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // return // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      let id = ''
      me ? id = decodedToken.userId : id = req.body.id
      return this.neo4jService.getAllUserActivity(id).subscribe(result => {
        console.log('rezultat u overview')
        console.log(result)
        return res.status(200).send(result)
      })
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      return this.redis.getOne(id, 'posts')
        .then(result => {
          this.neo4jService.getPostsByPostId(result.posts, result.posts.length).subscribe(r => {
            console.log('rezultat za objavljene postove')
            console.log(r)
            res.status(200).send(r)
          })
        })
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserUpvotedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      return this.redis.getOne(id, 'upvotes')
        .then(result => {
          this.neo4jService.getPostsByPostId(result.posts, result.posts.length).subscribe(r => {
            console.log('rezultat za upvotes')
            console.log(r)
            res.status(200).send(r)
          })
        })
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserDownvotedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      return this.redis.getOne(id, 'downvotes')
        .then(result => {
          this.neo4jService.getPostsByPostId(result.posts, result.posts.length).subscribe(r => {
            console.log('rezultat za downvotes')
            console.log(r)
            res.status(200).send(r)
          })
        })
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserCommentedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      return this.redis.getOne(id, 'comments')
        .then(result => {
          this.neo4jService.getPostsByPostId(result.posts, result.posts.length).subscribe(r => {
            console.log('rezultat za komentarisane')
            console.log(r)
            res.status(200).send(r)
          })
        })
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  savePost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      const postId = req.body.postId
      return this.redis.add(id, 'saved', postId)
        .then(result => res.status(200).send(result))
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserSavedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      return this.redis.getOne(id, 'saved')
        .then(result => {
          this.neo4jService.getPostsByPostId(result.posts, result.posts.length).subscribe(r => {
            console.log('rezultat za sacuvane')
            console.log(r)
            res.status(200).send(r)
          })
        })
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  subscribe (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decodedToken = jwtDecode(token)
      const userId = {
        id: decodedToken.userId
      }
      return this.neo4j.createRelationship2Nodes('User', 'Community', userId, req.body, 'FOLLOWING')
        .then(() => this.neo4j.createRelationship2Nodes('Community', 'User', req.body, userId, 'SUBSCRIBER'))
        .then(() => res.status(200).send({ status: 'Success' }))
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getUserCommunities (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const token = header.slice(7)
      const decoded = jwtDecode(token)
      return this.neo4j.selectRelationshipByNode2('Community', 'User', 'SUBSCRIBER', { id: decoded.userId }) // get all node1(posts) by relationship
        .then(result => res.status(200).send(result.records))
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getRecommendedCommunities (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      // jwtService.jwtVerify(header.slice(7), req.session.username).subscribe(result => {
      // if (result) {
      const obj = req.body
      return this.neo4j.selectMultipleRelationshipByNode1('Community', 'User', 'Community', obj, 'SUBSCRIBER', 'SUBSCRIBER')
        .then(result => res.status(200).send(result.records))
        .catch(e => res.status(400).send(e))
      //   } else {
      //     res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      //   }
      // })
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}

module.exports.UserRoutes = UserRoutes
