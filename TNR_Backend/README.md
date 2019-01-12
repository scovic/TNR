# TNR Backend - This is Not Reddit

## Installation

```sh
$ npm install
$ npm start
```

## Setup
For environment setup, create .env file based on .env-example and fill configuration objects with those variables

## Creating demo DB
Run this command only once. It will fill neo4j db with mock data.
```
node db/createDemoDb.js
```

## Configuration objects
##### Server configuration object:
```
server: {
    webroot: '',
    port: Number,
    isSecure: Boolean,
    env: '',
    sessionSecret: ''
  }
```
##### Neo4j configuration object:
```
neo4j: {
    host: '',
    port: 7687,
    username: '',
    password: ''
  }
```

#### Dependencies
* body-parser
* cookie-parser
* cors
* fs
* express
* express-session
* helmet
* morgan
* neo4j-driver
* node-env-file