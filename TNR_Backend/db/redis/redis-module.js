const redis = require('redis')

class Redis {
  constructor(dbConfig) {
    this.client = redis.createClient(dbConfig.redis)
  }

  add(key, field, value) {
    return new Promise((resolve, reject) => {
      this.client.HSET(key, field, value, (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  }

  get(key, field) {
    return new Promise((resolve, reject) => {
      this.client.HGET(key, field, (err, result) => {
        err ? reject(err) : resolve(result)
      })
    })
  }

  getMultiple(key, fieldArray) {
    return new Promise((resolve, reject) => {
      this.client.HMGET(key, ...fieldArray, (err, result) => {
        err ? reject(err) : resolve(result)
      })
    })
  }

  exists(key, field) {
    return new Promise((resolve, reject) => {
      this.client.HEXISTS(key ,field, (err, result) => {
        err ? reject(err) : resolve(result)
      })
    })
    
  }

  delete(key, field) {
    return new Promise((resolve, reject) => {
      this.client.HDEL(key, field, (err, result) => {
        err ? reject(err) : resolve(result)
      })
    })
  }

  deleteMulitple(key, fieldArray) {
    return new Promise((resolve, reject) => {
      this.client.HDEL(key, ...fieldArray, (err, result) => {
        err ? reject(err) : resolve(result)
      })
    })
  }

}


module.exports.Redis =  Redis