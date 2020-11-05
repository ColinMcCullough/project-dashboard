/* eslint-disable camelcase */
const PlacesApi = require('./../../controllers/places-api')
module.exports = (app) => {
  // USPS API Routes
  app.post('/api/places-api', async (req, res) => {
    try {
      const placesApi = new PlacesApi(req.body)
      const results = await placesApi.getPlaces()
      res.send(results)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })
}
