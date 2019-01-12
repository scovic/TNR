const env = require('node-env-file')

// GENERAL
const environment = process.env.NODE_ENV || 'development'
if (environment === 'development') {
  try {
    env('.env')
  } catch (e) {
    console.error('.env file is missing.', e)
  }
}

// SERVER
const webroot = process.env.SERVER_WEBROOT || 'localhost:4000'
const serverPort = process.env.SERVER_PORT || 4000
const isServerSecure = String(process.env.SERVER_IS_SECURE).toLowerCase() === 'true'
const sessionSecret = process.env.SESSION_SECRET || ''

module.exports = {
  server: {
    webroot: webroot,
    port: serverPort,
    isSecure: isServerSecure,
    env: environment,
    sessionSecret: sessionSecret
  }
}
