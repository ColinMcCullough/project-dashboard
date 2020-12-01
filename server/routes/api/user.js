const models = require('../../models')
const auth = require('../../controllers/g5-auth')
module.exports = (app) => {
  app.get('/api/v1/users/testing', auth.isSuperAdmin, (req, res) => {
    res.sendStatus(200)
  })
  app.get('/api/v1/users', async (req, res) => {
    const users = await models.user.findAll({
      include: [
        {
          model: models.userGroup
        },
        {
          model: models.role
        }
      ]
    })
    res.json(users)
  })
}
