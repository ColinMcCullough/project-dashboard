const queue = require('../../controllers/queue')
const { queues } = require('../../controllers/queue')
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
}
