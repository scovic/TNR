const jwtService = require('../services/jwt-service')

class CustomRoutes {
  constructor (neo4j, neo4jService) {
    this.neo4jModule = neo4j
    this.neo4jService = neo4jService
  }

  getAllCommunityPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const legit = jwtService.verifyToken(header.slice(7))
      if (legit) {
        const community = {
          title: req.params.community
        }

        this.neo4jModule.selectRelationshipByNode2('Post', 'Community', 'SUBJECT', community) // get all node1(posts) by relationship
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
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  getAllUserCommentedPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const userId = {
        id: req.params.id
      }

      this.neo4jModule.selectRelationship3ByNode1('User', 'Comment', 'Post', userId, 'COMMENTED', 'ON_POST')
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

      this.neo4jService.createComment(comment, user, post)
        .then(resp => res.status(201).send({ status: 'Comment added' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
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
}
module.exports.CustomRoutes = CustomRoutes
