const env = require('node-env-file')

const environment = process.env.NODE_ENV || 'development'
if (environment === 'development') {
  try {
    env('.env')
  } catch (e) {
    console.error('.env file is missing.', e)
  }
}

const neo4jHost = process.env.NEO4J_HOST || 'localhost'
const neo4jPort = process.env.NEO4J_PORT || 7474
const neo4jUsername = process.env.NEO4J_USERNAME || ''
const neo4jPassword = process.env.NEO4J_PASSWORD || ''

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || 6379

module.exports = {
  neo4j: {
    host: neo4jHost,
    port: neo4jPort,
    username: neo4jUsername,
    password: neo4jPassword
  },
  redis: {
    host: redisHost,
    port: redisPort
  }
}
