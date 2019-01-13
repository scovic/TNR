const Server = require('./server').Server
const EntryRoutes = require('./routes/entry-routes').EntryRoutes
const PostRoutes = require('./routes/post-routes').PostRoutes
const Neo4j = require('./db/neo4j/neo4j-module').Neo4j

class Main {
  constructor (serverConfig, dbConfig) {
    this.serverConfig = serverConfig
    this.dbConfig = dbConfig
  }

  start () {
    this.server = new Server(this.serverConfig)
    this.neo4j = new Neo4j(this.dbConfig)
    this.entryRoutes = new EntryRoutes(this.neo4j)
    this.postRoutes = new PostRoutes(this.neo4j)

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
      route: '/posts/vote',
      method: 'put',
      onRequest: (req, res, next) => {
        this.postRoutes.vote(req, res, next)
      }
    },
    {
      route: '/user/:id/commented-posts',
      method: 'get',
      onRequest: (req, res, next) => {
        this.postRoutes.getAllUserCommentedPosts(req, res, next)
      }
    }]
  }
}
module.exports.Main = Main
