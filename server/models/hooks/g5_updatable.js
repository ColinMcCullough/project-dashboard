const UserPermissionFilter = require('../../controllers/userQueryFilter')
module.exports = (models, sequelize, Sequelize) => {
// before the query is ran check and see if userRoles are passed in and if so filter the query to clients/ location they have access to
  models.g5_updatable_client.addHook('beforeFind', (param1) => {
    const userPermissionFilter = new UserPermissionFilter(param1, models.g5_updatable_client, sequelize, Sequelize)
    return userPermissionFilter.modifyQuery()
  })

  models.g5_updatable_location.addHook('beforeFind', (param1) => {
    const userPermissionFilter = new UserPermissionFilter(param1, models.g5_updatable_location, sequelize, Sequelize)
    return userPermissionFilter.modifyQuery()
  })
}
