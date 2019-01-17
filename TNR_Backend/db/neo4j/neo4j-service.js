const { bindNodeCallback } = require('rxjs')
const { map, flatMap } = require('rxjs/operators')

class Neo4jService {
  constructor (neo4j, redis) {
    this.neo4jModule = neo4j
    this.redis = redis

    this.neo4jModule.createConstraint('User', 'username')
      .catch(e => console.log(e))

    this.neo4jModule.createConstraint('Community', 'title')
      .catch(e => console.log(e))
  }

  getOneCommunityPosts (communityTitle) {
    const query = `MATCH (c:Community)-[:HAS_POST]-(p:Post)-[:PUBLISHED_BY]->(u1:User)
                    MATCH (p:Post)-[r:UPVOTED_BY]->(u2:User) WHERE c.title='${communityTitle}'
                    RETURN u1, p, COUNT(r) as count
                    ORDER BY p.created_at DESC
                    LIMIT 30`
    return this.neo4jModule.customizedQuery(query)
      .catch(e => console.log(e))
  }

  getAllCommunityPosts (username) {
    const query = `MATCH (c:Community)-[:HAS_POST]-(p:Post)-[:PUBLISHED_BY]->(u1:User)
                    MATCH (p:Post)-[r:UPVOTED_BY]->(u2:User) WHERE u1.username='${username}'
                    RETURN u1, p, c, COUNT(r) as count
                    ORDER BY p.created_at DESC
                    LIMIT 30`
    return this.neo4jModule.customizedQuery(query)
      .catch(e => console.log(e))
  }

  getMostPopular () {
    const query = `MATCH (c:Community)-[:HAS_POST]-(p:Post)-[:PUBLISHED_BY]->(u1:User)
                    MATCH (p:Post)-[r:UPVOTED_BY]->(u2:User)                    
                    RETURN u1, p, c, COUNT(r) as count
                    ORDER BY count DESC
                    LIMIT 30`
    return this.neo4jModule.customizedQuery(query)
      .catch(e => console.log(e))
  }

  getMostRecentlyAddedPosts () {
    const query = `MATCH (c:Community)-[:HAS_POST]-(p:Post)-[:PUBLISHED_BY]->(u1:User)
                    MATCH (p:Post)-[r:UPVOTED_BY]->(u2:User)
                    RETURN u1, p, c, COUNT(r) as count
                    ORDER BY p.created_at DESC
                    LIMIT 30`
    return this.neo4jModule.customizedQuery(query)
      .catch(e => console.log(e))
  }

  getPostComments (postId) {
    const query = `MATCH (p:Post)-[:HAS_COMMENT]-(c:Comment)-[:COMMENTED_BY]->(u:User)
                    WHERE ID(p)=${postId}
                    RETURN u,c
                    LIMIT 30`
    return this.neo4jModule.customizedQuery(query)
      .catch(e => console.log(e))
  }

  getDetailsByPostId (post) {
    const postId = post.records[0]._fields[0].identity.low
    const query = `MATCH (c:Community)-[:HAS_POST]-(p:Post)-[:PUBLISHED_BY]->(u1:User)
                    MATCH (p:Post)-[r:UPVOTED_BY]->(u2:User) WHERE ID(p)=${postId}              
                    RETURN u1, p, c, COUNT(r) as count
                    ORDER BY count DESC
                    LIMIT 30`
    return this.neo4jModule.customizedQuery(query)
  }

  getPostsById (postId) {
    const query = `MATCH (c:Community)-[:HAS_POST]-(p:Post)-[:PUBLISHED_BY]->(u1:User)
                    WHERE ID(p)=${postId}              
                    RETURN u1, p, c
                    LIMIT 30`
    return this.neo4jModule.customizedQuery(query)
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

  getAllUserActivityIds (id) {
    return bindNodeCallback((id, callback) => {
      return this.redis.getMultiple(id, ['posts', 'comments', 'upvotes', 'downvotes', 'saved'])
        .then((result) => {
          const keys = Object.keys(result)
          let ids = keys.map(key => result[key].map(el => {
            return {
              id: el
            }
          }))
          callback(null, ids)
        })
    })(id)
  }

  getAllUserActivityTmp (idsArr) { // ids is an array of arrays for published posts, commented, upvoted etc.
    return bindNodeCallback((idsArr, callback) => {
      let count = 0
      idsArr.forEach(arr => {
        count += arr.length
      })
      let posts = []
      idsArr.forEach(arr => {
        return arr.forEach(id => this.neo4jModule.getNode('Post', id)
          .then(post => {
            posts.push(post)
            if (--count === 0) {
              let filtered = posts.filter(el => el !== undefined)
              callback(null, filtered)
            }
          }))
      })
    })(idsArr)
  }

  getDetails (ids, counter) { // ids -> array to send to getDetailsByPostId until --counter === 0
    return bindNodeCallback((ids, counter, callback) => {
      let posts = []
      return ids.forEach(id => {
        this.getDetailsByPostId(id).then(post => {
          posts = [...posts, post]
          if (--counter === 0) {
            callback(null, posts)
          }
        })
      })
    })(ids, counter)
  }

  getAllUserActivity (id) {
    const observable = this.getAllUserActivityIds(id).pipe(
      flatMap(idsArr => this.getAllUserActivityTmp(idsArr)),
      flatMap(ids => this.getDetails(ids, ids.length)),
      map(result => result)
    )
    return observable
  }

  getPostsByPostId (ids, counter) { // ids -> array to send to getDetailsByPostId until --counter === 0
    return bindNodeCallback((ids, counter, callback) => {
      let posts = []
      return ids.forEach(id => {
        let num = parseInt(id)
        this.getPostsById(num).then(post => {
          posts = [...posts, post]
          if (--counter === 0) {
            callback(null, posts)
          }
        })
      })
    })(ids, counter)
  }
}

module.exports.Neo4jService = Neo4jService
