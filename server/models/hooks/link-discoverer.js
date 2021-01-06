module.exports = (models, sequelize, Sequelize) => {
  const { EXCESSIVE_PAGE_LIMIT } = process.env
  const queues = require('../../controllers/queue')
  const assetScraperVals = require('../../config/assetScraper')
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
    return location.update({ crawled: true, crawling: false })
  })
  models.linkDiscoverer.addHook('afterCreate', async (instance, options) => {
    const { 'asset-scraper': assetScraper } = queues.queues
    const data = instance.toJSON()
    if (!data.excessivePages) {
      const location = await models.location.findOne({
        where: {
          id: data.locationId
        }
      })
      const { properties, id: locationId, locationProjectId } = location.toJSON()
      const { pages } = data
      const rootdomain = properties.current_website.replace(/(^\w+:|^)\/\//, '')
      const rootProtocol = properties.current_website.includes('https://') ? 'https' : 'http'
      const job = {
        rootdomain,
        rootProtocol,
        locationId,
        pages,
        ...assetScraperVals,
        config: {
          photos: {
            folder: `onboarding/${locationProjectId}`
          }
        }
      }
      await assetScraper.add('run', job)
      await instance.update({ scraping: true })
    }
  })
}
