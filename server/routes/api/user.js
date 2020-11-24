const models = require('../../models')
module.exports = (app) => {
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
