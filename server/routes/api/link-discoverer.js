const rover = require('../../controllers/google-auth')

module.exports = (app) => {
  app.post('/link-dicoverer', async (req, res) => {
    try {
      const { body } = req
      const response = await rover(body)
      res.status(200).json(response)
    } catch (err) {
      res.status(500).send(err)
    }
  })
}