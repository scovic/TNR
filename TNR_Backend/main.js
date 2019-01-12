const Server = require('./server').Server
const EntryRoutes = require('./routes/entry-routes').EntryRoutes
const Neo4j = require('./db/neo4j').Neo4j

class Main {
  constructor (serverConfig, dbConfig) {
    this.serverConfig = serverConfig
    this.dbConfig = dbConfig
  }

  start () {
    this.server = new Server(this.serverConfig)
    this.neo4j = new Neo4j(this.dbConfig)
    this.entryRoutes = new EntryRoutes(this.neo4j)

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
    }]
  }
}
module.exports.Main = Main
