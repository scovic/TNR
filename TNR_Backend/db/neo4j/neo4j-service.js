class Neo4jService {
  constructor (neo4j, redis) {
    this.neo4jModule = neo4j
    this.redis = redis

    this.neo4jModule.createConstraint('User', 'username')
      .catch(e => console.log(e))

    this.neo4jModule.createConstraint('Community', 'title')
      .catch(e => console.log(e))
  }

  createPost (post, user, community) {
    return this.neo4jModule.createNode('Post', post)
      .then(resp => {
        let postId = { id: resp.records[0].get(0).identity.low }
        post.id = postId.id
        this.redis.add(user.id, 'posts', post.id)
        return this.neo4jModule.createRelationship2Nodes('Post', 'User', post, user, 'PUBLISHED_BY')
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Post', user, post, 'PUBLISHED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'Community', post, community, 'SUBJECT'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Community', 'Post', community, post, 'HAS_POST'))
  }

  createComment (comment, user, post) {
    return this.redis.add(user.id, 'comments', post.id)
      .then(() => this.neo4jModule.createNode('Comment', comment))
      .then(resp => {
        let commentId = { id: resp.records[0].get(0).identity.low }
        comment.id = commentId.id
        comment.upvotes = 0
        return this.neo4jModule.createRelationship2Nodes('Comment', 'User', comment, user, 'COMMENTED_BY')
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Comment', user, comment, 'COMMENTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Comment', 'Post', comment, post, 'ON_POST'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'Comment', post, comment, 'HAS_COMMENT'))
  }

  createCommunity (community, user) {
    return this.neo4jModule.createNode('Community', community)
      .then(resp => {
        let communityId = { id: resp.records[0].get(0).identity.low }
        community.id = communityId.id
        community.subscribers = 0
        return this.neo4jModule.createRelationship2Nodes('Community', 'User', community, user, 'HAS_ADMIN')
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Community', user, community, 'IS_ADMIN'))
  }

  postUpVote (userId, user, post) {
    return this.redis.add(userId.toString(), 'upvotes', post.id)
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Post', user, post, 'UPVOTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'User', post, user, 'UPVOTED_BY'))
  }

  postDownVote (userId, user, post) {
    return this.redis.add(userId, 'downvotes', post.id)
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Post', user, post, 'DOWNVOTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'User', post, user, 'DOWNVOTED_BY'))
  }
}

module.exports.Neo4jService = Neo4jService
