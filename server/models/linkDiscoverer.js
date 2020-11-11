const { INTEGER, JSONB } = require('sequelize')

module.exports = sequelize => sequelize.define('linkDiscoverer', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  pages: {
    type: JSONB,
    allowNull: false
  }
})
