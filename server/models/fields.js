const { INTEGER, STRING, JSONB, BOOLEAN, ARRAY } = require('sequelize')

module.exports = sequelize => sequelize.define('field', {
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
  inputType: {
    type: STRING
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
  isHub: {
    type: BOOLEAN
  }
})
