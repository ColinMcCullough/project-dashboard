const { nanoid } = require('nanoid')
const { queues } = require('../../controllers/queue')
module.exports = (models, sequelize, Sequelize) => {
  models.location.addHook('beforeCreate', async (instance, opts) => {
    instance.dataValues.locationId = nanoid()
  })
  models.location.addHook('afterUpdate', async (instance, opts) => {
    if (!instance.dataValues.crawled && !instance.dataValues.crawling && instance.dataValues.properties.url) {
      const { 'link-discoverer': linkDiscoverer } = queues
      const body = {
        url: instance.dataValues.properties.url,
        locationId: instance.dataValues.id
      }
      await linkDiscoverer.add('run', body)
      instance.update({ crawling: true })
    }
  })
}
