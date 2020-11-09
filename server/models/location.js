const { INTEGER, STRING, JSONB, BOOLEAN } = require('sequelize')

module.exports = (sequelize) => {
  const location = sequelize.define('location', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING,
      allowNull: false
    },
    url: {
      type: STRING
    },
    address_1: {
      type: STRING
    },
    address_2: {
      type: STRING
    },
    city: {
      type: STRING
    },
    state_province: {
      type: STRING
    },
    postal_code: {
      type: STRING
    },
    properties: {
      type: JSONB
    },
    crawled: {
      type: BOOLEAN
    },
    scraped: {
      type: BOOLEAN
    }
  }, { paranoid: true })
  location.associate = (models) => {
    models.location.belongsTo(models.project)
  }
  return location
}
