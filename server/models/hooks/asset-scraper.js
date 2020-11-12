module.exports = (models, sequelize, Sequelize) => {
  models.assetScraper.addHook('afterCreate', async (instance, options) => {
    // update the location to say the linkdiscoverer is complete
    const { locationId } = instance.toJSON()
    console.log({ locationId })
    const location = await models.location.findOne({
      where: {
        id: locationId
      }
    })
    return location.update({ scraped: true })
  })
}
