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
    this.userRoutes = new UserRoutes(this.redis, this.neo4j)

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
      route: '/communities',
      method: 'get',
      onRequest: (req, res, next) => {
        this.communityRoutes.getAllCommunities(req, res, next)
      }
    },
    {
      route: '/:community',
      method: 'get',
      onRequest: (req, res, next) => {
        this.postRoutes.getAllCommunityPosts(req, res, next)
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
      route: '/user/posts/comments',
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserCommentedPosts(req, res, next)
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
      route: '/post/community', // get community which post belongs to
      method: 'post',
      onRequest: (req, res, next) => {
        this.postRoutes.getCommunity(req, res, next)
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
      route: '/posts/popular',
      method: 'get',
      onRequest: (req, res, next) => {
        this.postRoutes.getMostLikedPost(req, res, next)
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
      route: '/user/:user',
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAll(req, res, next)
      }
    },
    {
      route: '/user/:user/posts',
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserPosts(req, res, next)
      }
    },
    {
      route: '/user/:user/upvoted',
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserUpvotedPosts(req, res, next)
      }
    },
    {
      route: '/user/:user/downvoted',
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserDownvotedPosts(req, res, next)
      }
    },
    {
      route: '/user/:user/saved',
      method: 'get',
      onRequest: (req, res, next) => {
        this.userRoutes.getAllUserSavedPosts(req, res, next)
      }
    },
    {
      route: '/user/savePost',
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
    }]
  }
}
module.exports.Main = Main
