const linkController = require('../../controllers/link-discoverer')
const { queues } = require('../../controllers/queue')
const { 'link-discoverer': linkDiscoverer } = queues
module.exports = (app) => {
  app.post('/api/v1/link-discoverer', async (req, res) => {
    try {
      await linkDiscoverer.add('run', { ...req.body })
      res.sendStatus(200)
    } catch(e) {
      res.status(500).send(e.message)
    }
  })
}
