const Redis = require('./redis-service.js').RedisService;

const red = new Redis({host: 'localhost', port:6379})

red.add("123", "post", 1)
  .then(() => red.add("123", "post", 2))
  .then(() => red.getOne("123", "post"))
  .then((res) => console.log(res))



