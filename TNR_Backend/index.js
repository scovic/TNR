'use strict'

const serverConfig = require('./config/server.config')
const dbConfig = require('./config/db.config')
const Main = require('./main')

let main = new Main(serverConfig, dbConfig)
main.start()
