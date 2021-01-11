const { INTEGER, STRING, JSONB, BOOLEAN, DATE } = require('sequelize')

module.exports = (sequelize) => {
  const location = sequelize.define('location', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    locationProjectId: {
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
    crawling: {
      type: BOOLEAN,
      defaultValue: false
    },
    crawled: {
      type: BOOLEAN,
      defaultValue: false
    },
    scraping: {
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
    g5ApprovedOn: {
      type: DATE
    },
    clientApproved: {
      type: BOOLEAN,
      defaultValue: false
    },
    clientApprovedBy: {
      type: STRING
    },
    crawlSite: {
      type: BOOLEAN,
      defaultValue: true
    },
    vendor: {
      type: STRING
    },
    isCorporate: {
      type: BOOLEAN,
      defaultValue: false
    }
  }, { paranoid: true })
  location.associate = (models) => {
    models.location.hasMany(models.linkDiscoverer)
    models.location.hasMany(models.assetScraper)
    models.location.belongsToMany(models.package, { through: 'locationPackage' })
    // to associate client to many locations
    models.g5_updatable_client.hasMany(models.location)
  }
  return location
}
