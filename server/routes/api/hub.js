const models = require('../../models')

module.exports = (app) => {
  app.get('/api/v1/hub/clients', async (req, res) => {
    const clients = await models.g5_updatable_client.getAllExternal({})
    res.json(clients)
  })

  app.post('/api/v1/hub/clients', async (req, res) => {
    const { name, branded_name, city, country, domain, state, vertical, domain_type } = req.body
    const client = {
      name,
      properties: {
        branded_name,
        city,
        country,
        domain,
        state,
        vertical,
        domain_type
      }
    }
    const clients = await models.g5_updatable_client.create(client)
    res.json(clients)
  })
}
