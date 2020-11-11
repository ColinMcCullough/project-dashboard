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
        salesforce_project_id: projectId
      } = project.toJSON()
      return {
        clientName: null,
        clientId: null,
        projectId,
        locationCount: locations.length,
        discoverComplete,
        scrapeComplete
      }
    })
  }
}
