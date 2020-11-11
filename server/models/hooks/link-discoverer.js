const { EXCESSIVE_PAGE_LIMIT } = process.env
module.exports = (models, sequelize, Sequelize) => {
  models.linkDiscoverer.addHook('beforeCreate', async (instance, options) => {
    const { pages } = instance.toJSON()
    if (pages.length > parseInt(EXCESSIVE_PAGE_LIMIT)) {
      await instance.update({ excessivePages: true })
    }
  })
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
