const models = require('../models')
module.exports = {
  isSuperAdmin
}

async function isSuperAdmin(req, res, next) {
  const { id } = req.user
  const user = await models.user.findOne({
    where: { id },
    include: [
      {
        model: models.role
      }
    ]
  })
  const isAllowed = await user.isAllowed('super_admin')
  isAllowed ? next() : next('Dont go here')
}
