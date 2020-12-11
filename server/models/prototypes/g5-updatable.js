module.exports = (models, sequelize, Sequelize) => {
  models.g5_updatable_client.getAllExternal = () => models.g5_updatable_client.findAll({
    attributes: [
      'urn',
      'name',
      [Sequelize.json('properties.branded_name'), 'brandedName']
    ],
    order: [
      ['name', 'asc']
    ]
  })
}
