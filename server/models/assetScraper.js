const { INTEGER, JSONB } = require('sequelize')

module.exports = sequelize => sequelize.define('assetScraper', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  results: {
    type: JSONB,
    allowNull: false
  }
})
