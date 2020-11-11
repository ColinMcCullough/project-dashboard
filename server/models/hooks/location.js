const { nanoid } = require('nanoid')
module.exports = (models, sequelize, Sequelize) => {
  models.location.addHook('beforeCreate', async (instance, opts) => {
    await instance.update({ locationId: nanoid() })
  })
}
