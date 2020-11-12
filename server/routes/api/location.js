const models = require('../../models')
module.exports = (app) => {
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
          locationId: location.locationId,
          crawled: location.crawled,
          scraped: location.scraped,
          g5Approved: location.g5Approved,
          clientApproved: location.clientApproved,
          url: location.properties.url,
          name: location.properties.name,
          properties: location.properties
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
}
