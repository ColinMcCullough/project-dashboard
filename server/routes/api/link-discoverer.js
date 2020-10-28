const linkController = require('../../controllers/link-discoverer')
const cld = require('../../controllers/cld')

module.exports = (app) => {
  app.post('/link-discoverer', async (req, res) => {
    try {
      const { url } = req.body
      const links = await linkController(url)
      res.json(links)
    } catch(e) {
      res.status(500).send(e.message)
    }
  })
}
