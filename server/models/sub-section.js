const { INTEGER, STRING, JSONB } = require('sequelize')

module.exports = (sequelize) => {
  const subsection = sequelize.define('subsection', {
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
  subsection.associate = (models) => {
    subsection.hasMany(models.field)
  }
  return subsection
}
