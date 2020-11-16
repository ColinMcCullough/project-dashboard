module.exports = (models, sequelize, Sequelize) => {
  models.project.prototype.areAllCrawled = function () {
    const data = this.toJSON()
    this.dataValues.discoverComplete = true
    for (let i = 0; i < data.locations.length; i++) {
      const location = data.locations[i]
      if (!location.crawled) {
        this.dataValues.discoverComplete = false
        break
      }
    }
  }

  models.project.prototype.areAllScraped = function () {
    const data = this.toJSON()
    this.dataValues.scrapeComplete = true
    for (let i = 0; i < data.locations.length; i++) {
      const location = data.locations[i]
      if (!location.scraped) {
        this.dataValues.scrapeComplete = false
        break
      }
    }
  }

  models.project.locationsByProjectId = async (projectId) => {
    const project = await models.project.findOne({
      where: {
        salesforce_project_id: projectId
      },
      include: [
        {
          model: models.location,
          include: [
            {
              model: models.linkDiscoverer
            }
          ]
        }
      ]
    })
    const { locations } = project.toJSON()
    return locations
  }

  models.project.displayAll = async () => {
    const projects = await models.project.findAll({
      include: [{
        model: models.location
      }]
    })
    projects.forEach((project) => {
      project.areAllCrawled()
      project.areAllScraped()
    })
    return projects.map((project) => {
      const {
        discoverComplete,
        scrapeComplete,
        locations,
        project_status: status,
        estimated_go_live: estGoLive,
        salesforce_project_id: projectId
      } = project.toJSON()
      return {
        clientName: null,
        clientId: null,
        projectId,
        status,
        estGoLive,
        locationCount: locations.length,
        discoverComplete,
        scrapeComplete
      }
    })
  }
  models.project.displayOne = async (projectId) => {
    const project = await models.project.findOne({
      where: {
        salesforce_project_id: projectId
      },
      include: [
        {
          model: models.location
        }
      ]
    })
    project.areAllCrawled()
    project.areAllScraped()
    const { discoverComplete, scrapeComplete, locations } = project.toJSON()
    return {
      clientName: null,
      clientId: null,
      projectId,
      locationCount: locations.length,
      discoverComplete,
      scrapeComplete
    }
  }
}
