const { EXCESSIVE_PAGE_LIMIT } = process.env
const { queues } = require('../../controllers/queue')
const { 'asset-scraper': assetScraper } = queues
const assetScraperVals = require('../../config/assetScraper')
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

  models.linkDiscoverer.addHook('afterCreate', async (instance, options) => {
    const data = instance.toJSON
    if (!data.excessivePages) {
      const location = models.location.findOne({
        where: {
          id: data.locationId
        }
      })
      const { properties, locationId } = location.toJSON()
      const { pages } = data
      const rootDomain = properties.url.replace(/(^\w+:|^)\/\//, '')
      const rootProtocol = properties.url.includes('https://') ? 'https' : 'http'
      const job = {
        rootDomain,
        rootProtocol,
        locationId,
        pages,
        ...assetScraperVals,
        config: {
          photos: {
            folder: `onboarding/${locationId}`
          }
        }
      }
      await assetScraper.add('run', job)
    }
  })
}
