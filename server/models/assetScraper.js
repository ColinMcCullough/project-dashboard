const { INTEGER, JSONB } = require('sequelize')

module.exports = (sequelize) => {
  const assetScraper = sequelize.define('assetScraper', {
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
  assetScraper.associate = (models) => {
    models.assetScraper.belongsTo(models.location)
  }
  return assetScraper
}
