const { nanoid } = require('nanoid')
const { queues } = require('../../controllers/queue')
const UserPermissionFilter = require('../../controllers/userQueryFilter')
module.exports = (models, sequelize, Sequelize) => {
  models.location.addHook('beforeCreate', async (instance, opts) => {
    instance.dataValues.locationId = nanoid()
  })
  models.location.addHook('afterUpdate', async (instance, opts) => {
    if (instance.dataValues.crawlSite && !instance.dataValues.crawled && !instance.dataValues.crawling && instance.dataValues.properties.current_website) {
      const { 'link-discoverer': linkDiscoverer } = queues
      const body = {
        url: instance.dataValues.properties.current_website,
        locationId: instance.dataValues.id
      }
      await linkDiscoverer.add('run', body)
      instance.update({ crawling: true })
    } else if (!instance.dataValues.crawlSite && !instance.dataValues.crawled && !instance.dataValues.crawling && instance.dataValues.properties.current_website) {
      await instance.update({ crawled: true, scraped: true })
    }
  })
  // before the query is ran check and see if userRoles are passed in and if so filter the query to clients/ location they have access to
  models.location.addHook('beforeFind', (param1) => {
    const userPermissionFilter = new UserPermissionFilter(param1, models.location, sequelize, Sequelize)
    return userPermissionFilter.modifyQuery()
  })
}
