const RedisModule = require('./redis-module').Redis

class RedisService {
  constructor (dbConfig) {
    this.redis = new RedisModule(dbConfig)
  }

  async add (key, field, value) {
    try {
      let exists = await this.redis.exists(key, field)

      // ne postoji u bazi
      if (exists === 0) {
        return this.redis.add(key, field, value)
      } else {
        let fieldValue = await this.redis.get(key, field)
        let array = fieldValue.split(',')
        if (array.indexOf(value) !== -1) {
          array.push(value)
        }

        let newFieldValue = array.toString()
        return this.redis.add(key, field, newFieldValue)
      }
    } catch (e) {
      console.log('redis error: ' + e)
    }
  }

  async getOne (key, field) {
    let fieldValue = await this.redis.get(key, field)

    if (fieldValue) {
      return { [field]: fieldValue.split(',') }
    } else {
      return { [field]: [] }
    }
  }

  async getMultiple (key, fieldArray) {
    let fieldValueArray = await this.redis.get(key, fieldArray)

    let jsonObject = fieldArray.reduce((acc, field, index) => {
      if (fieldValueArray[index]) {
        return { ...acc, [field]: fieldValueArray[index].split(',') }
      } else {
        return { ...acc, [field]: [] }
      }
    }, {})
    return jsonObject
  }

  async deleteOne (key, field) {
    return this.redis.delete(key, field)
  }

  async deleteMultiple (key, fieldArray) {
    return this.redis.deleteMultiple(key, fieldArray)
  }
}

module.exports.RedisService = RedisService
