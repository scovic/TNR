class Neo4jService {
  constructor (neo4j, redis) {
    this.neo4jModule = neo4j
    this.redis = redis

    this.neo4jModule.createConstraint('User', 'username')
      .catch(e => console.log(e))

    this.neo4jModule.createConstraint('Community', 'title')
      .catch(e => console.log(e))
  }

  getAllCommunityPosts (communityTitle) {
    const query = `MATCH (c:Community)-[:HAS_POST]-(p:Post)-[:PUBLISHED_BY]->(u1:User)
                    MATCH (p:Post)-[r:UPVOTED_BY]->(u2:User) WHERE c.title='${communityTitle}'
                    RETURN u1, p, COUNT(r) as count`
    return this.neo4jModule.customizedQuery(query)
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
      .catch(e => console.log(e))
  }

  createComment (comment, user, post) {
    return this.redis.add(user.id, 'comments', post.id)
      .then(() => this.neo4jModule.createNode('Comment', comment))
      .then(resp => {
        let commentId = { id: resp.records[0].get(0).identity.low }
        comment.id = commentId.id
        return this.neo4jModule.createRelationship2Nodes('Comment', 'User', comment, user, 'COMMENTED_BY')
      })
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Comment', user, comment, 'COMMENTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Comment', 'Post', comment, post, 'ON_POST'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'Comment', post, comment, 'HAS_COMMENT'))
      .catch(e => console.log(e))
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
      .catch(e => console.log(e))
  }

  postUpVote (userId, user, post) {
    let postId = post.id
    return this.redis.add(userId, 'upvotes', postId)
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Post', user, post, 'UPVOTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'User', post, user, 'UPVOTED_BY'))
      .catch(e => {
        console.log(e)
      })
  }

  postDownVote (userId, user, post) {
    return this.redis.add(userId, 'downvotes', post.id)
      .then(resp => this.neo4jModule.createRelationship2Nodes('User', 'Post', user, post, 'DOWNVOTED'))
      .then(resp => this.neo4jModule.createRelationship2Nodes('Post', 'User', post, user, 'DOWNVOTED_BY'))
      .catch(e => console.log(e))
  }
}

module.exports.Neo4jService = Neo4jService
