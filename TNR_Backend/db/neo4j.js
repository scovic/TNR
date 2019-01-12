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

  updateNode (objToFind, newObj) {
    let keys = Object.keys(newObj)
    let query = ''

    keys.forEach(key => {
      query += `node.${key} = '${newObj[key]}' AND `
    })
    query = query.slice(0, query.length - 5)

    return this.session.run(
      `MATCH (node ${objToFind}) SET ${query} RETURN node`
    )
  }

  deleteNode (label, objectToDelete) {
    return this.session.run(
      `MATCH (node: ${label} ${objectToDelete}) DELETE node`
    )
  }

  createConstraint (label, key) {
    return this.session.run(
      `CREATE CONSTRAINT ON (node: ${label}) ASSERT node.${key} IS UNIQUE`
    )
  }

  createRelationship (label1, label2, key1, key2, relationship) {
    return this.session.run(
      `MATCH (n1: ${label1}), (n2: ${label2})
       WHERE n1.${key1} AND n2.${key2}
       CREATE (n1)-[r:${relationship}]->(n2)
       RETURN r`
    )
  }

  selectAllByLabel (label) {
    return this.session.run(
      `MATCH (node: ${label}) RETURN node`
    )
  }

  selectAllNodes () {
    return this.session.run(
      `MATCH (n) RETURN n`
    )
  }

  countNodesByLabel (label) {
    return this.session.run(
      `MATCH (node:${label}) RETURN count(node) as count`
    )
  }

  countRelationships (label1, label2, relationship) {
    this.sesstion.run(
      `MATCH (:${label1})-[r:${relationship}]->(:${label2}) RETURN count(r) as count`
    )
  }

  dropDB () {
    this.session.run(
      `MATCH (n) DETACH DELETE n`
    )
  }
}
module.exports.Neo4j = Neo4j
