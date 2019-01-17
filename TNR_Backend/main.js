const Server = require('./server').Server
const Neo4j = require('./db/neo4j/neo4j-module').Neo4j
const Neo4jService = require('./db/neo4j/neo4j-service').Neo4jService
const Redis = require('./db/redis/redis-service').RedisService
const EntryRoutes = require('./routes/entry-routes').EntryRoutes
const PostRoutes = require('./routes/post-routes').PostRoutes
const CommentRoutes = require('./routes/comment-routes').CommentRoutes
const CommunityRoutes = require('./routes/community-routes').CommunityRoutes
const UserRoutes = require('./routes/user-routes').UserRoutes

class Main {
  constructor (serverConfig, dbConfig) {
    this.serverConfig = serverConfig
    this.dbConfig = dbConfig
  }

  start () {
    this.server = new Server(this.serverConfig)
    this.neo4j = new Neo4j(this.dbConfig.neo4j)
    this.redis = new Redis(this.dbConfig.redis)
    this.neo4jService = new Neo4jService(this.neo4j, this.redis)
    this.entryRoutes = new EntryRoutes(this.neo4j)
    this.postRoutes = new PostRoutes(this.neo4j, this.neo4jService, this.redis)
    this.commentRoutes = new CommentRoutes(this.neo4j, this.neo4jService, this.redis)
    this.communityRoutes = new CommunityRoutes(this.neo4j, this.neo4jService, this.redis)
    this.userRoutes = new UserRoutes(this.redis, this.neo4j, this.neo4jService)

    this.bindToWebServer()
    this.server.start()
  }

  bindToWebServer () {
    this.server.bind = [{
      route: '/login',
      method: 'post',
      onRequest: (req, res, next) => {
        this.entryRoutes.login(req, res, next)
      }
    },
    {
      route: '/register',
      method: 'post',
      onRequest: (req, res, next) => {
        this.entryRoutes.register(req, res, next)
      }
    },
    {
      route: '/user/published', // redis gets post ids for posts which logged-in user posted
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserPosts(req, res, next)
      }
    },
    {
      route: '/communities',
      method: 'get',
      onRequest: (req, res, next) => {
        this.communityRoutes.getAllCommunities(req, res, next)
      }
    },
    {
      route: '/community/:community', // one community posts
      method: 'get',
      onRequest: (req, res, next) => {
        this.postRoutes.getOneCommunityPosts(req, res, next) // get community posts, users who posted them and number of likes
      }
    },
    {
      route: '/home', // posts from all subscribed communities
      method: 'get',
      onRequest: (req, res, next) => {
        this.postRoutes.getAllCommunityPosts(req, res, next)
      }
    },
    {
      route: '/posts/all', // all - sorted by timestamp
      method: 'get',
      onRequest: (req, res, next) => {
        this.postRoutes.getMostRecentlyAddedPosts(req, res, next)
      }
    },
    {
      route: '/posts/popular', // popular - sorted by likes
      method: 'get',
      onRequest: (req, res, next) => {
        this.postRoutes.getMostPopular(req, res, next)
      }
    },
    {
      route: '/posts/add-new',
      method: 'post',
      onRequest: (req, res, next) => {
        this.postRoutes.addPost(req, res, next)
      }
    },
    {
      route: '/posts/delete',
      method: 'delete',
      onRequest: (req, res, next) => {
        this.postRoutes.deletePost(req, res, next)
      }
    },
    {
      route: '/posts/update',
      method: 'put',
      onRequest: (req, res, next) => {
        this.postRoutes.updatePost(req, res, next)
      }
    },
    {
      route: '/posts/upvote',
      method: 'put',
      onRequest: (req, res, next) => {
        this.postRoutes.upVote(req, res, next)
      }
    },
    {
      route: '/posts/downvote',
      method: 'put',
      onRequest: (req, res, next) => {
        this.postRoutes.downVote(req, res, next)
      }
    },
    {
      route: '/user/overview', // redis gets post ids for posts which logged in user posted, commented, upvoted, downvoted and saved
      method: 'get',
      onRequest: (req, res, next) => {
        console.log('USO U OVERVIEW')
        this.userRoutes.getAllUserActivity(req, res, next, true)
      }
    },
    {
      route: '/user/overview', // redis gets post ids for posts which requested user posted, commented, upvoted, downvoted and saved
      method: 'post', // for requested user's id
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserActivity(req, res, next, false)
      }
    },
    {
      route: '/post/comments',
      method: 'post',
      onRequest: (req, res, next) => {
        this.commentRoutes.getPostComments(req, res, next)
      }
    },
    {
      route: '/comments/update',
      method: 'put',
      onRequest: (req, res, next) => {
        this.commentRoutes.updateComment(req, res, next)
      }
    },
    {
      route: '/comments/delete',
      method: 'delete',
      onRequest: (req, res, next) => {
        this.commentRoutes.deleteComment(req, res, next)
      }
    },
    {
      route: '/comments/add-new',
      method: 'post',
      onRequest: (req, res, next) => {
        this.commentRoutes.addComment(req, res, next)
      }
    },
    {
      route: '/community/delete',
      method: 'delete',
      onRequest: (req, res, next) => {
        this.communityRoutes.deleteCommunity(req, res, next)
      }
    },
    {
      route: '/community/update',
      method: 'put',
      onRequest: (req, res, next) => {
        this.communityRoutes.updateCommunity(req, res, next)
      }
    },
    {
      route: '/community/add-new',
      method: 'post',
      onRequest: (req, res, next) => {
        this.communityRoutes.addCommunity(req, res, next)
      }
    },
    {
      route: '/user/communities',
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getUserCommunities(req, res, next)
      }
    },
    {
      route: '/user/save-post', // redis
      method: 'post',
      onRequest: (req, res, next) => {
        this.userRoutes.savePost(req, res, next)
      }
    },
    {
      route: '/user/subscribe',
      method: 'post',
      onRequest: (req, res, next) => {
        this.userRoutes.subscribe(req, res, next)
      }
    },
    {
      route: '/user/recommended',
      method: 'post',
      onRequest: (req, res, next) => {
        this.userRoutes.getRecommendedCommunities(req, res, next)
      }
    },
    {
      route: '/user/upvoted', // redis gets post ids for posts which logged-in user liked
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserUpvotedPosts(req, res, next)
      }
    },
    {
      route: '/user/downvoted', // redis gets post ids for posts which logged-in user disliked
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserDownvotedPosts(req, res, next)
      }
    },
    {
      route: '/user/commented', // redis gets post ids for posts which logged-in user commented on
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserCommentedPosts(req, res, next)
      }
    },
    {
      route: '/user/saved', // redis gets post ids for posts which logged-in user saved
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserSavedPosts(req, res, next)
      }
    }]
  }
}
module.exports.Main = Main
