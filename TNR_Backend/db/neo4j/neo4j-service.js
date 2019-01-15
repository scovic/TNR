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

  postUpVote (userId, post) {
    this.redis.add(userId, 'upvotes', post.id)
      .then(() => this.neo4j.findNode('Post', post))
      .then(resp => {
        let votes = resp.records[0].get(0).properties.upvotes
        this.neo4jModule.updateNode('Post', post, { upvotes: ++votes })
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Post', userId, post, 'UPVOTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'User', post, userId, 'UPVOTED_BY'))
  }

  postDownVote (userId, post) {
    this.redis.add(userId, 'upvotes', post.id)
      .then(() => this.neo4j.findNode('Post', post))
      .then(resp => {
        let votes = resp.records[0].get(0).properties.upvotes
        this.neo4jModule.updateNode('Post', post, { upvotes: --votes })
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Post', userId, post, 'DOWNVOTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'User', post, userId, 'DOWNVOTED_BY'))
  }

  commentUpVote (userId, comment) {
    this.neo4j.findNode('Comment', comment)
      .then(resp => {
        let votes = resp.records[0].get(0).properties.upvotes
        this.neo4jModule.updateNode('Comment', comment, { upvotes: ++votes })
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Comment', userId, comment, 'LIKED_COMMENT'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Comment', 'User', comment, userId, 'LIKED_BY'))
  }

  commentDownVote (userId, comment) {
    this.neo4j.findNode('Comment', comment)
      .then(resp => {
        let votes = resp.records[0].get(0).properties.upvotes
        this.neo4jModule.updateNode('Comment', comment, { upvotes: --votes })
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Comment', userId, comment, 'DISLIKED_COMMENT'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Comment', 'User', comment, userId, 'DISLIKED_BY'))
  }
}

module.exports.Neo4jService = Neo4jService
