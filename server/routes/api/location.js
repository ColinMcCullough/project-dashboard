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
  app.get('/api/v1/projects/:projectId/locations', async (req, res) => {
    const data = [
      {
        locationId,
        crawled,
        scraped,
        g5Approved,
        clientApproved,
        url
      }
    ]
  })
  app.get('/api/v1/projects/:projectId/locations/:locationId', async (req, res) => {
    const data = {
      locationId : '',
      name: null,
      street_address_1: null,
      street_address_2: null,
      city: null,
      state: null,
      postal_code: null,
      country: null,
      local_phone_number: null,
      display_phone_number: null,
      amenities : []
    }
  })
}
