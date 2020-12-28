const { INTEGER, JSONB } = require('sequelize')

module.exports = (sequelize) => {
  const section = sequelize.define('section', {
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
  section.associate = (models) => {
    section.hasMany(models.field)
    section.hasMany(models.subsection)
    section.belongsToMany(models.package, { through: 'sectionPackage' })
  }
  return section
}
