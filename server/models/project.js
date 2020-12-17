const { INTEGER, STRING, DATE } = require('sequelize')

module.exports = (sequelize) => {
  const project = sequelize.define('project', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    salesforce_project_id: {
      type: STRING
    },
    project_name: {
      type: STRING
    },
    project_type: {
      type: STRING
    },
    contract_date: {
      type: DATE
    },
    estimated_go_live: {
      type: DATE
    },
    project_status: {
      type: STRING
    },
    project_manager: {
      type: STRING
    },
    masterProjectId: {
      type: STRING
    }
  }, { paranoid: true })
  project.associate = (models) => {
    models.project.hasMany(models.location)
    models.project.belongsTo(models.salesforceAccount)
    models.project.belongsToMany(models.g5_updatable_client, { through: 'projectClients' })
  }
  return project
}
