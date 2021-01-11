module.exports = (models, sequelize, Sequelize) => {
  models.g5_updatable_client.getAllExternal = userRoles => models.g5_updatable_client.findAll({
    attributes: [
      'urn',
      'name',
      'id',
      [Sequelize.json('properties.branded_name'), 'branded_name'],
      [Sequelize.json('properties.city'), 'city'],
      [Sequelize.json('properties.state'), 'state'],
      [Sequelize.json('properties.country'), 'country'],
      [Sequelize.json('properties.domain'), 'domain'],
      [Sequelize.json('properties.domain_type'), 'domain_type'],
      [Sequelize.json('properties.vertical'), 'vertical']
    ],
    order: [
      ['name', 'asc']
    ],
    userRoles
  })
}
