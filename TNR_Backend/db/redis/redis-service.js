const RedisModule = require('./redis-module').Redis

class RedisService {
  constructor (dbConfig) {
    this.redis = new RedisModule(dbConfig)
  }

  async add (key, field, value) {
    let exists = await this.redis.exists(key, field)

    // ne postoji u bazi
    if (exists === 0) {
      return await this.redis.add(key, field, value)
    } else {
      let fieldValue = await this.redis.get(key, field)
      let array = fieldValue.split(',')
      array.push(value)
      let newFieldValue = array.toString()
      return await this.redis.add(key, field, newFieldValue)
    }
  }

  async getOne (key, field) {
    let fieldValue = await this.redis.get(key, field)
    return { [field]: fieldValue.split(',') }
  }

  async getMultiple (key, fieldArray) {
    let fieldValueArray = await this.redis.get(key, fieldArray)
    let jsonObject = fieldArray.reduce((acc, field, index) => {
      return { ...acc, [field]: fieldValueArray[index].split(',') }
    }, {})
    return jsonObject
  }

  async deleteOne (key, field) {
    return await this.redis.delete(key, field)
  }

  async deleteMultiple (key, fieldArray) {
    return await this.redis.deleteMultiple(key, fieldArray)
  }
}

module.exports.RedisService = RedisService
