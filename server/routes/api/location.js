const models = require('../../models')
module.exports = (app) => {
  app.get('/api/v1/projects/:projectId/clients', async (req, res) => {
    const { projectId } = req.params
    const clients = await models.project.findOne({
      where: {
        salesforce_project_id: projectId
      },
      include: [{
        model: models.g5_updatable_client
      }]
    })
    const { g5_updatable_clients } = clients
    const filteredClients = g5_updatable_clients.map((property) => {
      return {
        urn: property.urn,
        name: property.name,
        branded_name: property.properties.branded_name,
        city: property.properties.city,
        state: property.properties.state,
        country: property.properties.country,
        domain: property.properties.domain,
        domain_type: property.properties.domain_type,
        vertical: property.properties.vertical,
        id: property.id,
        isAssociated: true,
        clientType: property.urn ? 'existing' : 'new'
      }
    })
    res.json(filteredClients)
  })
  // removes association of client to project
  app.delete('/api/v1/projects/:projectId/clients/:clientId', async (req, res) => {
    const { projectId, clientId } = req.params
    const client = await models.g5_updatable_client.findOne({
      where: {
        id: clientId
      }
    })
    const project = await models.project.findOne({
      where: {
        salesforce_project_id: projectId
      }
    })
    await project.removeG5_updatable_client(client)
    res.sendStatus(200)
  })

  app.post('/api/v1/projects/:projectId/clients', async (req, res) => {
    const { projectId } = req.params
    const { clientIds } = req.body
    const clients = await models.g5_updatable_client.findAll({
      where: {
        id: {
          [models.Sequelize.Op.in]: clientIds
        }
      }
    })
    console.log(projectId)
    const project = await models.project.findOne({
      where: {
        salesforce_project_id: projectId
      }
    })
    await project.addG5_updatable_client(clients)
    res.json(clients)
  })

  app.get('/api/v1/projects', async (req, res) => {
    const projects = await models.project.displayAll()
    res.json(projects)
  })

  app.get('/api/v1/projects/:projectId', async (req, res) => {
    const { projectId } = req.params
    const project = await models.project.displayOne(projectId)
    res.json(project)
  })
  // returns array of locations matching project id each location is object containng object
  app.get('/api/v1/projects/:projectId/locations', async (req, res) => {
    try {
      const { projectId } = req.params
      const locations = await models.project.locationsByProjectId(projectId)
      const val = locations.map((location) => {
        return {
          locationId: location.locationProjectId,
          g5UpdatableClientId: location.g5UpdatableClientId,
          crawled: location.crawled,
          scraped: location.scraped,
          g5Approved: location.g5Approved,
          clientApproved: location.clientApproved,
          properties: location.properties,
          pages: location.crawled ? location.linkDiscoverers[location.linkDiscoverers.length - 1].pages : [],
          cloudinaryFolder: `onboarding/${location.locationProjectId}`,
          crawlSite: location.crawlSite,
          isCorporate: location.isCorporate,
          vendor: location.vendor
        }
      })
      res.json(val)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })

  app.get('/api/v1/projects/:projectId/locations/:locationId', async (req, res) => {
    try {
      const { locationId } = req.params
      const location = await models.location.locationById(locationId)
      const val = {
        locationId,
        ...location.dataValues.properties
      }
      res.json(val)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })

  app.put('/api/v1/projects/:projectId/locations/:locationId', async (req, res) => {
    const { body, params } = req
    const { locationId } = params
    const location = await models.location.findOne({ where: { locationProjectId: locationId } })
    await location.update(body)
    res.json(200)
  })

  app.put('/api/v1/projects/:projectId/locations', async (req, res) => {
    const { body } = req
    if (Array.isArray(body)) {
      for (let i = 0; i < body.length; i++) {
        const { properties: updateProps, locationId, g5UpdatableClientId } = body[i]
        const location = await models.location.locationById(locationId)
        const { properties } = location.toJSON()
        const keys = Object.keys(updateProps)
        keys.forEach((key) => {
          const value = updateProps[key]
          properties[key] = value
        })
        await location.update({ properties, g5UpdatableClientId })
      }
    }
    res.json(200)
  })

  app.get('/api/v1/projects/:projectId/excessivePages', async (req, res) => {
    const { projectId } = req.params
    const project = await models.project.findOne({
      where: {
        salesforce_project_id: projectId
      },
      include: [
        {
          model: models.location,
          include: [
            {
              model: models.linkDiscoverer
            }
          ]
        }
      ],
      order: [
        [models.location, models.linkDiscoverer, 'createdAt', 'DESC']
      ]
    })
    const data = project.toJSON()

    const locations = data.locations.map((location) => {
      const { id: locationId } = location
      const { linkDiscoverers } = location
      const linkDiscoverer = linkDiscoverers[0]
      const { pages, excessivePages } = linkDiscoverer
      const { name } = location.properties
      return {
        locationId,
        name,
        pages,
        excessivePages
      }
    }).filter(location => location.excessivePages)
    res.json(locations)
  })
}
