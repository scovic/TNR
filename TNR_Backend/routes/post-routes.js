class PostRoutes {
  constructor (neo4j) {
    this.neo4j = neo4j
  }

  getAllCommunityPosts (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const community = {
        title: req.params.community
      }

      this.neo4j.selectRelationshipByNode2('Post', 'Community', 'SUBJECT', community) // get all node1(posts) by relationship
        .then(result => res.status(200).send(result.records))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }

  addPost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const post = req.body.post
      const community = req.body.community
      const user = req.body.user

      this.neo4j.createNode('Post', post)
        .then(resp => {
          let postId = { id: resp.records[0].get(0).identity.low }
          post.id = postId.id
          return this.neo4j.createRelationship2Nodes('Post', 'User', post, user, 'PUBLISHED_BY')
        })
        .then(resp => this.neo4j.createRelationship2Nodes('User', 'Post', user, post, 'PUBLISHED'))
        .then(resp => this.neo4j.createRelationship2Nodes('Post', 'Community', post, community, 'SUBJECT'))
        .then(resp => this.neo4j.createRelationship2Nodes('Community', 'Post', community, post, 'HAS_POST'))
        .then(resp => res.status(201).send({ status: 'Post created' }))
        .catch(e => res.status(400).send(e))
    }
  }

  deletePost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const post = req.body

      this.neo4j.deleteNode('Post', post)
        .then(result => res.status(200).send({ status: 'Deleted' }))
        .catch(e => res.status(400).send(e))
    }
  }

  updatePost (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const post = req.body
      const idToFind = {
        id: post.id
      }

      this.neo4j.updateNode('Post', idToFind, post)
        .then(result => res.status(200).send({ status: 'Updated successfully.' }))
        .catch(e => res.status(400).send(e))
    }
  }

  voteUp (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const post = req.body

      this.neo4j.findNode('Post', post)
        .then()// incr upvotes then update
    }
  }
}
module.exports.PostRoutes = PostRoutes
