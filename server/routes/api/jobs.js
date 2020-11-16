const queue = require('../../controllers/queue')
const { queues } = require('../../controllers/queue')
const models = require('../../models')
module.exports = (app) => {
  app.get('/api/v1/jobs', (req, res) => {
    res.json(Object.keys(queue))
  })

  app.post('/api/v1/jobs/asset-scraper', async (req, res) => {
    const body = req.body
    const { 'asset-scraper': assetScraper } = queues
    await assetScraper.add('run', body)
    res.sendStatus(200)
  })
  app.post('/api/v1/jobs/link-discoverer', async (req, res) => {
    const body = req.body
    const { 'link-discoverer': linkDiscoverer } = queues
    try {
      await linkDiscoverer.add('run', body)
      res.sendStatus(200)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })

  app.post('/api/v1/jobs/link-discoverer/:projectId', async (req, res) => {
    try {
      const { 'link-discoverer': linkDiscoverer } = queues
      const { projectId } = req.params
      const projectLocations = await models.project.findOne({
        where: {
          salesforce_project_id: projectId
        },
        include: [
          {
            model: models.location
          }
        ]
      })
      const { locations } = projectLocations.toJSON()
      for (let i = 0; i < locations.length; i++) {
        const { url } = locations[i].properties
        await linkDiscoverer.add('run', { url })
      }
      res.sendStatus(200)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })
  app.post('/api/v1/jobs/asset-scraper/:projectId', async (req, res) => {
    try {
      const { 'asset-scraper': assetScraper } = queues
      const { body } = req
      for (let i = 0; i < body.length; i++) {
        await assetScraper.add('run', body[i])
      }
      res.sendStatus(200)
    } catch (e) {
      res.status(500).send(e.message)
    }
    res.sendStatus(200)
  })
}
