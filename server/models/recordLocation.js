const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => sequelize.define('recordLocation', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: STRING
  }
})
