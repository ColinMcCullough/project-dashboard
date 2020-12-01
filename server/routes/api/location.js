const models = require('../../models')
module.exports = (app) => {
  app.get('/api/v1/projects', async (req, res) => {
    const { userRoles } = req
    const projects = await models.project.displayAll({ userRoles })
    res.json(projects)
  })
  app.get('/api/v1/projects/:projectId', async (req, res) => {
    const { projectId } = req.params
    const { userRoles } = req
    const project = await models.project.displayOne({ projectId, userRoles })
    res.json(project)
  })
  // returns array of locations matching project id each location is object containng object
  app.get('/api/v1/projects/:projectId/locations', async (req, res) => {
    try {
      const { projectId } = req.params
      const { userRoles } = req
      const locations = await models.project.locationsByProjectId({ projectId, userRoles })
      const val = locations.map((location) => {
        return {
          locationId: location.locationId,
          crawled: location.crawled,
          scraped: location.scraped,
          g5Approved: location.g5Approved,
          clientApproved: location.clientApproved,
          properties: location.properties,
          pages: location.crawled ? location.linkDiscoverers[location.linkDiscoverers.length - 1].pages : []
        }
      })
      res.json(val)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })

  app.get('/api/v1/projects/:projectId/locations/:locationId', async (req, res) => {
    const { userRoles } = req
    try {
      const { locationId } = req.params
      const location = await models.location.locationById({ locationId, userRoles })
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
    const { userRoles } = req
    const { body, params } = req
    const { locationId } = params
    const location = await models.location.locationById({ locationId, userRoles })
    await location.update(body)
    res.json(200)
  })

  app.put('/api/v1/projects/:projectId/locations', async (req, res) => {
    const { body } = req
    const { userRoles } = req
    if (Array.isArray(body)) {
      for (let i = 0; i < body.length; i++) {
        const { properties: updateProps, locationId } = body[i]
        const location = await models.location.locationById({ locationId, userRoles })
        const { properties } = location.toJSON()
        const keys = Object.keys(updateProps)
        keys.forEach((key) => {
          const value = updateProps[key]
          properties[key] = value
        })
        await location.update({ properties })
      }
    }
    res.json(200)
  })
}
