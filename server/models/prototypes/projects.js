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
  models.project.prototype.isScraping = function () {
    const data = this.toJSON()
    this.dataValues.isScraping = false
    for (let i = 0; i < data.locations.length; i++) {
      const location = data.locations[i]
      if (location.scraping) {
        this.dataValues.isScraping = true
        break
      }
    }
  }
  models.project.prototype.isCrawling = function () {
    const data = this.toJSON()
    this.dataValues.isCrawling = false
    for (let i = 0; i < data.locations.length; i++) {
      const location = data.locations[i]
      if (location.crawling) {
        this.dataValues.isCrawling = true
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
  models.project.prototype.allUrlsSet = function () {
    const data = this.toJSON()
    this.dataValues.urlsSet = true
    this.dataValues.urlsMissing = 0
    for (let i = 0; i < data.locations.length; i++) {
      const location = data.locations[i]
      if (!location.properties.current_website) {
        this.dataValues.urlsMissing++
        this.dataValues.urlsSet = false
      }
    }
  }
  models.project.prototype.allApproved = function () {
    const data = this.toJSON()
    this.dataValues.g5Approved = true
    for (let i = 0; i < data.locations.length; i++) {
      const location = data.locations[i]
      if (!location.g5Approved) {
        this.dataValues.g5Approved = false
        break
      }
    }
  }
  models.project.prototype.hasExcessivePages = function () {
    const data = this.toJSON()
    this.dataValues.excessivePages = false
    for (let i = 0; i < data.locations.length; i++) {
      const location = data.locations[i]
      if (location.linkDiscoverers.length > 0) {
        this.dataValues.excessivePages = location.linkDiscoverers[0].excessivePages
      }
    }
  }
  models.project.locationsByProjectId = async (projectId, userRoles) => {
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
    }, userRoles)
    const { locations } = project.toJSON()
    return locations
  }
  models.project.displayAll = async (userRoles) => {
    const query = {
      include: [{
        model: models.location,
        include: [{
          model: models.linkDiscoverer
        }
        ]
      },
      {
        model: models.salesforceAccount
      }],
      order: [
        [models.location, models.linkDiscoverer, 'createdAt', 'DESC']
      ]
    }
    const projects = await models.project.findAll({ ...query, userRoles })
    projects.forEach(project => computeFields(project))
    return projects.map(project => pluckData(project))
  }
  models.project.displayOne = async (projectId, userRoles) => {
    const rootWhere = { salesforce_project_id: projectId }
    const project = await models.project.findOne({
      where: rootWhere,
      include: [
        {
          model: models.location,
          include: [
            {
              model: models.linkDiscoverer
            }
          ]
        }
      ],
      order: [
        [models.location, models.linkDiscoverer, 'createdAt', 'DESC']
      ],
      userRoles
    })
    computeFields(project)
    return pluckData(project)
  }
}

function computeFields (project) {
  project.areAllCrawled()
  project.areAllScraped()
  project.isScraping()
  project.isCrawling()
  project.allUrlsSet()
  project.allApproved()
  project.hasExcessivePages()
}

function pluckData (project) {
  const {
    discoverComplete,
    scrapeComplete,
    locations,
    project_status: status,
    estimated_go_live: estGoLive,
    salesforce_project_id: projectId,
    project_name: projectName,
    urlsSet,
    urlsMissing,
    g5Approved,
    excessivePages,
    salesforceAccount,
    isScraping,
    isCrawling
  } = project.toJSON()
  let clientName = null
  let clientId = null
  if (salesforceAccount) {
    const { name, id } = salesforceAccount
    clientName = name
    clientId = id
  }

  return {
    clientName,
    clientId,
    projectId,
    projectName,
    status,
    estGoLive,
    locationCount: locations.length,
    discoverComplete,
    scrapeComplete,
    excessivePages,
    g5Approved,
    urlsSet,
    urlsMissing,
    isScraping,
    isCrawling
  }
}
