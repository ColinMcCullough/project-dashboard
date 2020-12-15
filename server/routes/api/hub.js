const models = require('../../models')

module.exports = (app) => {
  app.get('/api/v1/hub/clients', async (req, res) => {
    const clients = await models.g5_updatable_client.getAllExternal({})
    res.json(clients)
  })

  // need to pass in same object as post route
  app.put('/api/v1/hub/clients/:clientId', async (req, res) => {
    try {
      const { body } = req
      const { clientId } = req.params
      const client = await models.g5_updatable_client.findOne({
        where: {
          id: clientId
        }
      })
      await client.update(body)
      res.sendStatus(200)
    } catch (e) {
      res.send(e.msg).status(500)
    }
  })

  app.delete('/api/v1/hub/clients/:clientId', async (req, res) => {
    try {
      const { clientId } = req.params
      const client = await models.g5_updatable_client.findOne({
        where: {
          id: clientId
        }
      })
      if (client.dataValues.urn === null) {
        await client.destroy()
      }
      res.sendStatus(200)
    } catch (e) {
      res.send(e.msg).status(500)
    }
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
