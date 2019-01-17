# TNR Back-End

## Installation

```sh
$ npm install
$ node index.js
```

## Setup
For environment setup, create .env file based on .env-example and fill configuration objects with those variables

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

This project is licensed under the terms of the MIT license.