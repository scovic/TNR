# TNR Backend - This is Not Reddit

## Installation

```sh
$ npm install
$ node index.js
```

## Setup
For environment setup, create .env file based on .env-example and fill configuration objects with those variables

## Creating demo DB
Run this command only once. It will fill neo4j database with mock data. There are no relationships at the beginning. You still need to register as a user and test implemented functions to fill the database with neccessary relationships.
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
##### Database configuration objects:
```
neo4j: {
    host: '',
    port: 7687,
    username: '',
    password: ''
  }

redis: {
    host: '',
    port: 6379
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
* jsonwebtoken
* jwt-decode
* redis
* rxjs