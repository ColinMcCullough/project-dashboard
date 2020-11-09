const { INTEGER, JSONB } = require('sequelize')

module.exports = (sequelize) => {
  const linkDiscoverer = sequelize.define('linkDiscoverer', {
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
  linkDiscoverer.associate = (models) => {
    models.linkDiscoverer.belongsTo(models.location)
  }
  return linkDiscoverer
}
