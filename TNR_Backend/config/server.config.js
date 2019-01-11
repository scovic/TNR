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

// IAM LOGIN/REGISTER
const iamClientId = process.env.IAM_CLIENT_ID || ''
const iamClientSecret = process.env.IAM_CLIENT_SECRET || ''
const iamScope = process.env.IAM_CLIENT_SCOPE || ''
const iamAdminUsername = process.env.IAM_ADMIN_USERNAME || ''
const iamAdminPassword = process.env.IAM_ADMIN_PASSWORD || ''

// IAM ENDPOINT PROTECTION
const iamGrantType = process.env.IAM_GRANT_TYPE || ''
const iamUrl = process.env.IAM_SERVER_URL || ''
const iamRealm = process.env.IAM_REALM || ''
const iamRole = process.env.IAM_USER_ROLE || ''

module.exports = {
  server: {
    webroot: webroot,
    port: serverPort,
    isSecure: isServerSecure,
    env: environment,
    sessionSecret: sessionSecret
  },
  iam: {
    clientId: iamClientId,
    client_secret: iamClientSecret,
    grant_type: iamGrantType,
    scope: iamScope,
    serverUrl: iamUrl,
    realm: iamRealm,
    role: iamRole,
    adminUsername: iamAdminUsername,
    adminPassword: iamAdminPassword
  }
}
