const Server = require('./server').Server
const Neo4j = require('./db/neo4j/neo4j-module').Neo4j
const Neo4jService = require('./db/neo4j/neo4j-service').Neo4jService
const Redis = require('./db/redis/redis-service').RedisService
const EntryRoutes = require('./routes/entry-routes').EntryRoutes
const PostRoutes = require('./routes/post-routes').PostRoutes
const CommentRoutes = require('./routes/comment-routes').CommentRoutes
const MainRoutes = require('./routes/main-routes').MainRoutes
const CommunityRoutes = require('./routes/community-routes').CommunityRoutes

class Main {
  constructor (serverConfig, dbConfig) {
    this.serverConfig = serverConfig
    this.dbConfig = dbConfig
  }

  start () {
    this.server = new Server(this.serverConfig)
    this.neo4j = new Neo4j(this.dbConfig.neo4j)
    this.neo4jService = new Neo4jService(this.neo4j)
    this.redis = new Redis(this.dbConfig.redis)
    this.entryRoutes = new EntryRoutes(this.neo4j)
    this.postRoutes = new PostRoutes(this.neo4j, this.redis)
    this.commentRoutes = new CommentRoutes(this.neo4j, this.redis)
    this.communityRoutes = new CommunityRoutes(this.neo4j, this.redis)

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
      route: '/posts/:community',
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
        const label = 'Post'
        this.mainRoutes.deleteOne(req, res, next, label)
      }
    },
    {
      route: '/posts/update',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Post'
        this.mainRoutes.updateOne(req, res, next, label)
      }
    },
    {
      route: '/posts/vote',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Post'
        this.mainRoutes.vote(req, res, next, label)
      }
    },
    {
      route: '/user/:id/commented-posts',
      method: 'get',
      onRequest: (req, res, next) => {
        this.commentRoutes.getAllUserCommentedPosts(req, res, next)
      }
    },
    {
      route: '/comments/vote',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Comment'
        this.mainRoutes.vote(req, res, next, label)
      }
    },
    {
      route: '/comments/delete',
      method: 'delete',
      onRequest: (req, res, next) => {
        const label = 'Comment'
        this.mainRoutes.deleteOne(req, res, next, label)
      }
    },
    {
      route: '/comments/update',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Comment'
        this.mainRoutes.updateOne(req, res, next, label)
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
        const label = 'Community'
        this.mainRoutes.deleteOne(req, res, next, label)
      }
    },
    {
      route: '/community/update',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Community'
        this.mainRoutes.updateOne(req, res, next, label)
      }
    },
    {
      route: '/communities',
      method: 'get',
      onRequest: (req, res, next) => {
        const label = 'Community'
        this.mainRoutes.getAll(req, res, next, label)
      }
    },
    {
      route: '/community/add-new',
      method: 'post',
      onRequest: (req, res, next) => {
        this.communityRoutes.addCommunity(req, res, next)
      }
    }]
  }
}
module.exports.Main = Main
