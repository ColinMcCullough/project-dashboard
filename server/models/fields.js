const { INTEGER, STRING, JSONB, BOOLEAN, ARRAY } = require('sequelize')

module.exports = (sequelize) => {
  const field = sequelize.define('field', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    label: {
      type: JSONB
    },
    placeholder: {
      type: JSONB
    },
    required: {
      type: BOOLEAN
    },
    settings: {
      type: JSONB
    },
    displayVertical: {
      type: ARRAY(STRING)
    },
    displayOnCorp: {
      type: BOOLEAN
    },
    displayOnlyOnCorp: {
      type: BOOLEAN
    },
    bulkEditable: {
      type: BOOLEAN
    },
    dataKey: {
      type: STRING
    },
    component: {
      type: STRING
    },
    type: {
      type: STRING
    },
    description: {
      type: JSONB
    },
    validation: {
      type: JSONB
    }
  })
  field.associate = (models) => {
    models.field.belongsTo(models.recordLocation)
  }
  return field
}
