const jwtDecode = require('jwt-decode')
const jwtService = require('../services/jwt-service')

class PostRoutes {
  constructor (neo4j, redis) {
    this.neo4j = neo4j
    this.redis = redis
  }

  getAllCommunityPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const token = header.slice(7)
      const decoded = jwtDecode(token)
      if (!decoded) return res.status(403).send({ error: 'Authorization Error. Access Denied.' })
      if (!decoded.userId) return res.status(403).send({ error: 'Authorization Error. Access Denied.' })

      const legit = jwtService.jwtVerify(decoded.userId, token, res)
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

      this.neo4j.createNode('Post', post)
        .then(resp => {
          let postId = { id: resp.records[0].get(0).identity.low }
          post.id = postId.id
          this.redis.add(user.id, "posts", post.id)
          return this.neo4j.createRelationship2Nodes('Post', 'User', post, user, 'PUBLISHED_BY')
        })
        .then(resp => this.neo4j.createRelationship2Nodes('User', 'Post', user, post, 'PUBLISHED'))
        .then(resp => this.neo4j.createRelationship2Nodes('Post', 'Community', post, community, 'SUBJECT'))
        .then(resp => this.neo4j.createRelationship2Nodes('Community', 'Post', community, post, 'HAS_POST'))
        .then(resp => res.status(201).send({ status: 'Post created' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}
module.exports.PostRoutes = PostRoutes
