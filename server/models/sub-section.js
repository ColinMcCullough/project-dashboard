const { INTEGER, STRING, JSONB, BOOLEAN } = require('sequelize')

module.exports = (sequelize) => {
  const subSection = sequelize.define('subSection', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING
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
