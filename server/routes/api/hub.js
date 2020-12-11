const models = require('../../models')

module.exports = (app) => {
  app.get('/api/hub/clients', async (req, res) => {
    const clients = await models.g5_updatable_client.getAllExternal({})
    res.json(clients)
  })
}
