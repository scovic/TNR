const neo4j = require('neo4j-driver').v1
const config = require('../config/db.config')

const driver = neo4j.driver(`bolt://${config.neo4j.host}:${config.neo4j.port}`, neo4j.auth.basic(config.neo4j.username, config.neo4j.password))
const session = driver.session()

const createCommunities = () => {
  session.run('CREATE (c:Community { title : "Healthy Habits", subject: "health&fitness", rules:"no cursing, no hiting" }) RETURN c')
  session.run('CREATE (c:Community { title : "IT", subject: "it", rules:"no cursing, no hiting" }) RETURN c')
  session.run('CREATE (c:Community { title : "DevOps", subject: "devops", rules:"no cursing, no hiting" }) RETURN c')
  session.run('CREATE (c:Community { title : "Politics", subject: "politics", rules:"no cursing, no hiting"}) RETURN c')
  session.run('CREATE (c:Community { title : "Social media", subject: "social", rules:"no cursing, no hiting" }) RETURN c')
  session.run('CREATE (c:Community { title : "Programming", subject: "programming", rules:"no cursing, no hiting" }) RETURN c')
  session.run('CREATE (c:Community { title : "Fitness", subject: "fitness", rules:"no cursing, no hiting" }) RETURN c')
}

createCommunities()

// session.close()
// driver.close()
