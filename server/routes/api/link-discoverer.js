const discoverLinks = require('../../controllers/google-auth')

module.exports = (app) => {
  app.post('/link-dicoverer', async (req, res) => {
    try {
      const { body } = req
      const response = await discoverLinks(body)
      res.status(200).json(response)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  })
}