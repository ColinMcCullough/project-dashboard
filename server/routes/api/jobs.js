const queue = require('../../controllers/queue')
module.exports = (app) => {
  app.get('/api/v1/jobs', (req, res) => {
    res.json(Object.keys(queue))
  })
}
