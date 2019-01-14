'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const session = require('express-session')

class Server {
  constructor (config) {
    this.serverConfig = config.server
    this.app = express()
    this.router = express.Router()
    this.memoryStore = new session.MemoryStore()
    this.server = null
    this.cb = null
    this.cache = null
    this.init()
  }

  set bind (cbs) {
    this.cb = cbs
    if (cbs && cbs.length > 0) {
      for (let i = 0; i < cbs.length; i++) {
        let cb = cbs[i]
        let method = cb.method || 'all'
        this.router[method](cb.route, cb.onRequest)
      }
    }
  }

  get bind () {
    return this.cb
  }

  init () {
    this.app.use(session({
      secret: this.serverConfig.sessionSecret,
      resave: false,
      saveUninitialized: true,
      store: this.memoryStore
    }))

    if (this.serverConfig.isSecure) {
      this.app.use(helmet())
    }

    this.app.use(bodyParser.json({ limit: '50mb', parameterLimit: 1000000 }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
    this.app.use(cors({ credentials: true, origin: true }))
    if (this.serverConfig.env === 'development') {
      this.app.use(morgan('tiny'))
    }
    this.app.use(cookieParser())
    this.app.use('/', this.router)

    // Allow Origin
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT')
      next()
    })

    this.app.options('/*', (req, res, next) => {
      res.send(200)
    })

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      res.status(404).json({ status: 'error', data: null, message: 'Not Found' })
    })

    // error handler
    this.app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
      // render the error page
      res.status(err.status || 500).json({ status: 'error', data: null, message: err })
      // res.render('error')
    })
  }

  start () {
    this.server = this.app.listen(this.serverConfig.port, () => {
      console.log('APP listening at: ' + this.serverConfig.webroot)
    })
  }
}
module.exports.Server = Server
