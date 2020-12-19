const { INTEGER, STRING, JSONB, BOOLEAN } = require('sequelize')

module.exports = (sequelize) => {
  const subSection = sequelize.define('subsection', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: JSONB
    },
    priority: {
      type: INTEGER
    }
  })
  subSection.associate = (models) => {
    subSection.hasMany(models.field)
  }
  return subSection
}
