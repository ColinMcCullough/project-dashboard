module.exports = (models, sequelize, Sequelize) => {
  models.linkDiscoverer.addHook('afterCreate', async (instance, options) => {
    // update the location to say the linkdiscoverer is complete
    const { locationId } = instance.toJSON()
    const location = await models.location.findOne({
      where: {
        id: locationId
      }
    })
    return location.update({ crawled: true })
  })
}
