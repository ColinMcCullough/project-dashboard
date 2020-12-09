module.exports = (models, sequelize, Sequelize) => {
  models.location.locationById = async (locationProjectId) => {
    const location = await models.location.findOne({
      where: {
        locationProjectId
      }
    })
    return location
  }
}
