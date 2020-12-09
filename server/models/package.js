const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => sequelize.define('package', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  salesforceId: {
    type: STRING
  },
  name: {
    type: STRING
  }
})
