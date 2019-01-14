class Neo4jService {
  constructor (neo4j) {
    this.neo4jModule = neo4j
  }

  updateVotes (label, obj) {
    return this.neo4jModule.findNode(label, obj.post)
      .then(resp => {
        let votes = resp.records[0].get(0).properties.upvotes // 0 - incr, 1 - decr
        obj.vote.status === 0 ? ++votes : --votes
        this.neo4jModule.updateNode(label, obj.post, { upvotes: votes })
      })
      .then(resp => resp)
  }

  createPost (post, user, community) {
    return this.neo4j.createNode('Post', post)
      .then(resp => {
        let postId = { id: resp.records[0].get(0).identity.low }
        post.id = postId.id
        return this.neo4j.createRelationship2Nodes('Post', 'User', post, user, 'PUBLISHED_BY')
      })
      .then(resp => this.neo4j.createRelationship2Nodes('User', 'Post', user, post, 'PUBLISHED'))
      .then(resp => this.neo4j.createRelationship2Nodes('Post', 'Community', post, community, 'SUBJECT'))
      .then(resp => this.neo4j.createRelationship2Nodes('Community', 'Post', community, post, 'HAS_POST'))
      .then(resp => resp)
  }

  createComment (comment, user, post) {
    return this.neo4jModule.createNode('Comment', comment)
      .then(resp => {
        let commentId = { id: resp.records[0].get(0).identity.low }
        comment.id = commentId.id
        return this.neo4jModule.createRelationship2Nodes('Comment', 'User', comment, user, 'COMMENTED_BY')
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Comment', user, comment, 'COMMENTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Comment', 'Post', comment, post, 'ON_POST'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'Comment', post, comment, 'HAS_COMMENT'))
      .then(resp => resp)
  }

  createCommunity (community, user) {
    return this.neo4jModule.createNode('Comment', community)
      .then(resp => {
        let communityId = { id: resp.records[0].get(0).identity.low }
        community.id = communityId.id
        return this.neo4jModule.createRelationship2Nodes('Community', 'User', community, user, 'HAS_ADMIN')
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Community', user, community, 'IS_ADMIN'))
      .then(resp => resp)
  }
}

module.exports.Neo4jService = Neo4jService
