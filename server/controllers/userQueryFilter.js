class UserPermissionFilter {
  constructor(query, rootModel, sequelize, Sequelize) {
    this.query = query
    this.rootModel = rootModel
    this.sequelize = sequelize
    this.Sequelize = Sequelize
    this.Op = Sequelize.Op
    this.isGlobalUser = false
    this.userPerms = { clientUrn: [], locationUrn: [] }
    this.userFilterModelNames = ['location', 'g5_updatable_client', 'g5_updatable_location']
    this.mapUpdatables = {
      'G5Updatable::Client': 'clientUrn',
      'G5Updatable::Location': 'locationUrn'
    }
  }

  modifyQuery() {
    if (this.query.userRoles) {
      this.getAllowedUrns()
      this.query = this.addUserPermFilter(this.rootModel.name, this.query)
      if (!this.isGlobalUser) {
        this.query = this.traverseAndReplace(this.query)
      }
    }
    return this.query
  }

  getAllowedUrns() {
    this.query.userRoles.forEach((r) => {
      if (r.type === 'GLOBAL') {
        this.isGlobalUser = true
      } else {
        this.userPerms[this.mapUpdatables[r.type]].push(r.urn)
      }
    })
  }

  addUserPermFilter(modelName = this.rootModel.name, query) {
    if (this.userFilterModelNames.includes(modelName)) {
      query.where = this.addClientLocationFilter(query.where)
    }
    return query
  }

  addClientLocationFilter(where) {
    if (!where) {
      where = {}
    }
    where[this.Op.or] = []
    Object.keys(this.userPerms).forEach((k) => {
      if (this.userPerms[k].length > 0) {
        where[this.Op.or].push({
          [k]: {
            [this.Op.in]: this.userPerms[k]
          }
        })
      }
    })

    return where
  }

  traverseAndReplace(query) {
    for (const k in query) {
      if (k === 'model') {
        const modelName = query[k].name
        query = this.addUserPermFilter(modelName, query)
      } else if (Array.isArray(query[k]) && k === 'include') {
        for (let i = 0; i < query[k].length; i++) {
          query[k][i] = this.traverseAndReplace(query[k][i])
        }
      }
    }
    return query
  }
}

module.exports = UserPermissionFilter
