const Server = require('./server').Server
const Neo4j = require('./db/neo4j/neo4j-module').Neo4j
const Neo4jService = require('./db/neo4j/neo4j-service').Neo4jService
const EntryRoutes = require('./routes/entry-routes').EntryRoutes
const CustomRoutes = require('./routes/custom-routes').CustomRoutes
const GeneralRoutes = require('./routes/general-routes').GeneralRoutes

class Main {
  constructor (serverConfig, dbConfig) {
    this.serverConfig = serverConfig
    this.dbConfig = dbConfig
  }

  start () {
    this.server = new Server(this.serverConfig)
    this.neo4j = new Neo4j(this.dbConfig)
    this.neo4jService = new Neo4jService(this.neo4j)
    this.entryRoutes = new EntryRoutes(this.neo4j)
    this.customRoutes = new CustomRoutes(this.neo4j, this.neo4jService)
    this.generalRoutes = new GeneralRoutes(this.neo4j, this.neo4jService)

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
        this.customRoutes.getAllCommunityPosts(req, res, next)
      }
    },
    {
      route: '/posts/add-new',
      method: 'post',
      onRequest: (req, res, next) => {
        this.customRoutes.addPost(req, res, next)
      }
    },
    {
      route: '/posts/delete',
      method: 'delete',
      onRequest: (req, res, next) => {
        const label = 'Post'
        this.generalRoutes.deleteOne(req, res, next, label)
      }
    },
    {
      route: '/posts/update',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Post'
        this.generalRoutes.updateOne(req, res, next, label)
      }
    },
    {
      route: '/posts/vote',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Post'
        this.generalRoutes.vote(req, res, next, label)
      }
    },
    {
      route: '/user/:id/commented-posts',
      method: 'get',
      onRequest: (req, res, next) => {
        this.customRoutes.getAllUserCommentedPosts(req, res, next)
      }
    },
    {
      route: '/comments/vote',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Comment'
        this.generalRoutes.vote(req, res, next, label)
      }
    },
    {
      route: '/comments/delete',
      method: 'delete',
      onRequest: (req, res, next) => {
        const label = 'Comment'
        this.generalRoutes.deleteOne(req, res, next, label)
      }
    },
    {
      route: '/comments/update',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Comment'
        this.generalRoutes.updateOne(req, res, next, label)
      }
    },
    {
      route: '/comments/add-new',
      method: 'post',
      onRequest: (req, res, next) => {
        this.customRoutes.addComment(req, res, next)
      }
    },
    {
      route: '/community/delete',
      method: 'delete',
      onRequest: (req, res, next) => {
        const label = 'Community'
        this.generalRoutes.deleteOne(req, res, next, label)
      }
    },
    {
      route: '/community/update',
      method: 'put',
      onRequest: (req, res, next) => {
        const label = 'Community'
        this.generalRoutes.updateOne(req, res, next, label)
      }
    },
    {
      route: '/communities',
      method: 'get',
      onRequest: (req, res, next) => {
        const label = 'Community'
        this.generalRoutes.getAllByType(req, res, next, label)
      }
    },
    {
      route: '/community/add-new',
      method: 'post',
      onRequest: (req, res, next) => {
        this.customRoutes.addCommunity(req, res, next)
      }
    }]
  }
}
module.exports.Main = Main
