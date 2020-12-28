const { INTEGER, STRING, JSONB, BOOLEAN } = require('sequelize')

module.exports = (sequelize) => {
  const subsection = sequelize.define('subsection', {
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
  subsection.associate = (models) => {
    subsection.hasMany(models.field)
  }
  return subsection
}
