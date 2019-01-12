const neo4j = require('neo4j-driver').v1

class Neo4j {
  constructor (dbConfig) {
    this.dbConfig = dbConfig

    this.driver = neo4j.driver(`bolt://${this.dbConfig.neo4j.host}:${this.dbConfig.neo4j.port}`,
      neo4j.auth.basic(this.dbConfig.neo4j.username, this.dbConfig.neo4j.password))
    this.session = this.driver.session()
  }

  createNode (label, object) {
    let keys = Object.keys(object)
    let properties = keys.map(key => `${key}: $${key}`)

    return this.session.run(
      `CREATE (node:${label} {${properties}}) RETURN node`,
      object
    )
  }

  findNode (label, object) {
    let keys = Object.keys(object)
    let query = ''

    keys.forEach(key => {
      query += `node.${key} = '${object[key]}' AND `
    })
    query = query.slice(0, query.length - 5)

    return this.session.run(
      `MATCH (node: ${label}) WHERE ${query} RETURN node`
    )
  }

  createConstraint (label, key) {
    return this.session.run(
      `CREATE CONSTRAINT ON (node: ${label}) ASSERT node.${key} IS UNIQUE`
    )
  }

  deleteNode (label, objectToDelete) {
    return this.session.run(
      `MATCH (node: ${label} ${objectToDelete}) DELETE node`
    )
  }
}
module.exports.Neo4j = Neo4j
