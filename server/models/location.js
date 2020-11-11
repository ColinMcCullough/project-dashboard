const { INTEGER, STRING, JSONB, BOOLEAN } = require('sequelize')

module.exports = (sequelize) => {
  const location = sequelize.define('location', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    locationId: {
      type: STRING
    },
    clientUrn: {
      type: STRING
    },
    locationUrn: {
      type: STRING
    },
    properties: {
      type: JSONB
    },
    crawled: {
      type: BOOLEAN,
      defaultValue: false
    },
    scraped: {
      type: BOOLEAN,
      defaultValue: false
    },
    g5Approved: {
      type: BOOLEAN,
      defaultValue: false
    },
    g5ApprovedBy: {
      type: STRING
    },
    clientApproved: {
      type: BOOLEAN,
      defaultValue: false
    },
    clientApprovedBy: {
      type: STRING
    }
  }, { paranoid: true })
  location.associate = (models) => {
    models.location.hasMany(models.linkDiscoverer)
    models.location.hasMany(models.assetScraper)
  }
  return location
}
