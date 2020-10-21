const discoverLinks = require('../../controllers/google-auth')
const axios = require('axios')

module.exports = (app) => {
  app.post('/api/v1/discover', async (req, res) => {
    try {
      const { url } = req.body
      const links = await axios
        .post(`${process.env.LINK_DISCOVERER_URL}/discover`, { url })
        .then(res => res.data)
      res.status(200).json(links)
    } catch (err) {
      res.status(503).json(err)
    }
  })
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