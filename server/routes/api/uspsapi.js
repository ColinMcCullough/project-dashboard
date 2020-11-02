/* eslint-disable camelcase */
const addressValidator = require('./../../controllers/usps-validation')
module.exports = (app) => {
  // USPS API Routes
  app.post('/routes/api/uspsapi/verify-address', async (req, res) => {
    try {
      const result = await addressValidator(req.body.form)
      res.send(result)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })
}
