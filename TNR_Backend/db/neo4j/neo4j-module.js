const neo4j = require('neo4j-driver').v1

class Neo4j {
  constructor (dbConfig) {
    this.dbConfig = dbConfig

    this.driver = neo4j.driver(`bolt://${this.dbConfig.host}:${this.dbConfig.port}`,
      neo4j.auth.basic(this.dbConfig.username, this.dbConfig.password))
    this.session = this.driver.session()
  }

  createNode (label, object) {
    const keys = Object.keys(object)
    const properties = keys.map(key => `${key}: $${key}`) // seen from neo4j js driver

    return this.session.run(
      `CREATE (node:${label} {${properties}}) RETURN node`,
      object
    )
  }

  findNode (label, object) {
    const { id, ...objNoId } = object // delete id property cuz query would look for n1.id BUT it should be a func ID(n1)
    const keys = Object.keys(objNoId)
    let query = ''

    keys.forEach(key => {
      query += `node.${key} = '${objNoId[key]}' AND `
    })
    id ? query += `ID(node)=${id}` : query = query.slice(0, query.length - 5)

    return this.session.run(
      `MATCH (node: ${label}) WHERE ${query} RETURN node`
    )
  }

  updateNode (label, objToFind, updatedObj) {
    // delete id property 'cuz query would look for node.id BUT it should be a func ID(node)
    const { id, ...updateNoId } = updatedObj
    const keysToUpdate = Object.keys(updateNoId)

    let updateQuery = ''
    keysToUpdate.forEach(key => {
      updateQuery += `node.${key} = '${updateNoId[key]}' AND `
    })
    updateQuery = updateQuery.slice(0, updateQuery.length - 5)

    let findQuery = `ID(node)=${objToFind.id}`

    return this.session.run(
      `MATCH (node: ${label}) WHERE ${findQuery} SET ${updateQuery} RETURN node`
    )
  }

  deleteNode (label, objectToDelete) {
    return this.session.run(
      `MATCH (node: ${label}) WHERE ID(node)=${objectToDelete.id} DETACH DELETE node`
    )
  }

  selectAllByLabel (label) {
    return this.session.run(
      `MATCH (node: ${label}) RETURN node`
    )
  }

  selectAllNodes () {
    return this.session.run(
      `MATCH (node) RETURN node`
    )
  }

  countNodesByLabel (label) {
    return this.session.run(
      `MATCH (node:${label}) RETURN count(node) as count`
    )
  }

  countNodesByCriteria (label, objToFind) {
    const { id, ...objToFindNoId } = objToFind
    const keys = Object.keys(objToFind)
    let query = ''

    if (keys.length > 0) {
      keys.forEach(key => {
        query += `node.${key}=${objToFindNoId[key]} AND `
      })
    }

    id ? query += `ID(node)=${id}` : query = query.slice(0, query.length - 5)

    return this.session.run(
      `MATCH (node:${label}) WHERE ${query} RETURN count(node) as count`
    )
  }

  createConstraint (label, key) {
    return this.session.run(
      `CREATE CONSTRAINT ON (node: ${label}) ASSERT node.${key} IS UNIQUE`
    )
  }

  createRelationshipGeneral (label1, label2, relationship) {
    return this.session.run(
      `MATCH (n1: ${label1}) WITH n1
       MATCH (n2: ${label2})
       CREATE (n1)-[r:${relationship}]->(n2)
       RETURN r`
    )
  }

  createRelationship2Nodes (label1, label2, obj1, obj2, relationship) {
    const { id, ...obj1NoId } = obj1 // omit id from ob1
    const id2 = obj2.id
    const obj2NoId = Object.keys(obj2).reduce((acc, key) => {
      if (key !== 'id') { return { ...acc, [key]: obj2[key] } } else return acc
    }, {}) // delete id property 'cuz query would look for n1.id BUT it should be a func ID(n1)

    const keys1 = Object.keys(obj1NoId)
    const keys2 = Object.keys(obj2NoId)
    let query = ''

    keys1.forEach(key => {
      query += `n1.${key} = '${obj1NoId[key]}' AND `
    })

    keys2.forEach(key => {
      query += `n2.${key} = '${obj2NoId[key]}' AND `
    })

    if (!id && !id2) {
      query = query.slice(0, query.length - 5)
    } else if (id && !id2) {
      query += `ID(n1)=${id}`
    } else if (!id && id2) {
      query += `ID(n2)=${id2}`
    } else {
      query += `ID(n1)=${obj1.id} AND ID(n2)=${id2}`
    }

    return this.session.run(
      `MATCH (n1: ${label1}) WITH n1
       MATCH (n2: ${label2})
       WHERE ${query}
       CREATE (n1)-[r:${relationship}]->(n2)
       RETURN r`
    )
  }

  countRelationships (label1, label2, relationship) {
    return this.session.run(
      `MATCH (:${label1})-[r:${relationship}]->(:${label2}) RETURN count(r) as count`
    )
  }

  selectRelationshipByNode2 (label1, label2, relationship, obj2) { // get all nodes1 by relationship with node2
    const { id, ...obj2NoId } = obj2
    const keys = Object.keys(obj2NoId)
    let query = ''

    keys.forEach(key => {
      query += `n2.${key} = '${obj2NoId[key]}' AND `
    })
    id ? query += `ID(n2)=${id}` : query = query.slice(0, query.length - 5)

    return this.session.run(
      `MATCH (n1:${label1})-[r:${relationship}]->(n2:${label2}) WHERE ${query} RETURN n1`
    )
  }

  selectRelationship3ByNode1 (lab1, lab2, lab3, obj1, rel1, rel2) { // get all nodes3 by relationships with node1 and node2
    return this.session.run(
      `MATCH (n1:${lab1})-[:${rel1}]-(:${lab2})-[:${rel2}]->(n3:${lab3})
       WHERE ID(n1)=${obj1.id}
       RETURN n3`
    )
  }

  deleteRelationship (label1, label2, obj1, obj2, relationship) {
    return this.session.run(
      `MATCH (:${label1} ${obj1})-[r:${relationship}]->(:${label2} ${obj2}) DELETE r`
    )
  }

  dropDB () {
    return this.session.run(
      'MATCH (n) DETACH DELETE n'
    )
  }
}
module.exports.Neo4j = Neo4j
