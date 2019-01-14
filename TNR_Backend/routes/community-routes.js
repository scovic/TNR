class CommunityRoutes {
  constructor (neo4j, redis) {
    this.neo4j = neo4j
    this.redis = redis
  }

  addCommunity (req, res, next) {
    const header = req.headers.authorization
    if (header && (header.indexOf('Bearer') !== -1 || header.indexOf('bearer') !== -1) && header.indexOf('undefined') === -1) {
      const community = req.body.community
      const user = req.body.user // admin, who added it

      this.neo4j.createNode('Comment', community)
        .then(resp => {
          let communityId = { id: resp.records[0].get(0).identity.low }
          community.id = communityId.id
          return this.neo4j.createRelationship2Nodes('Community', 'User', community, user, 'HAS_ADMIN')
        })
        .then(resp => this.neo4j.createRelationship2Nodes('User', 'Community', user, community, 'IS_ADMIN'))
        .then(resp => res.status(201).send({ status: 'Community added' }))
        .catch(e => res.status(400).send(e))
    } else {
      res.status(403).send({ error: 'Authorization Error. Access Denied.' })
    }
  }
}
module.exports.CommunityRoutes = CommunityRoutes
