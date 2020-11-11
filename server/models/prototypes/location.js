module.exports = (models, sequelize, Sequelize) => {
  models.location.locationById = async (locationId) => {
    const location = await models.location.findOne({
      where: {
        locationId
      }
    })
    return location
  }
}
