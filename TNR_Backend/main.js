const Server = require('./server').Server
const EntryRoutes = require('./routes/entry-routes')

class Main {
  constructor (serverConfig, dbConfig) {
    this.serverConfig = serverConfig
    this.dbConfig = dbConfig
  }

  start () {
    this.server = new Server(this.serverConfig)
    // this.db
    this.entryRoutes = new EntryRoutes(this.serverConfig, this.dbConfig)
  }

  bindToWebServer () {
    this.server.bind = [{
      route: '/user/login',
      method: 'post',
      onRequest: (req, res, next) => {
        this.entryRouts.login(req, res, next)
      }
    },
    {
      route: '/user/register',
      method: 'post',
      onRequest: (req, res, next) => {
        this.entryRouts.register(req, res, next)
      }
    },
    {
      route: `/realms/${this.serverConfig.iam.realm}/protocol/openid-connect/token`,
      method: 'post',
      onRequest: (req, res, next) => {
        this.entryRouts.initClientAdapter(req, res, next)
      }
    }]
  }
}
module.exports.Main = Main
