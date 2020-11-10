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
      type: STRING,
      allowNull: false
    },
    project_name: {
      type: STRING,
      allowNull: false
    },
    project_type: {
      type: STRING,
      allowNull: false
    },
    contract_date: {
      type: DATE,
      allowNull: false
    },
    estimated_go_live: {
      type: DATE,
      allowNull: false
    },
    project_status: {
      type: STRING,
      allowNull: false
    },
    project_manager: {
      type: STRING
    }
  }, { paranoid: true })
  // project.associate = (models) => {
  //   // models.project.belongsTo(models.client)
  //   // models.project.belongsToMany(models.location, { through: 'project_id' })
  // }
  return project
}
