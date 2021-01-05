const models = require('../../../models')
const states = require('../../../config/states')
const LocationPropertiesSeeder = require('../../location-properties-seeder')
module.exports = {
  processor,
  concurrency: 1,
  hooks
}

async function processor(job, done, { sfApi }) {
  try {
    if (!sfApi.isLoggedIn) {
      console.log('Signing In')
      await sfApi.signIn()
    }
    const { data } = job
    const { notifications } = data['soapenv:envelope']['soapenv:body']
    for (let i = 0; i < notifications.length; i++) {
      const { sobject } = notifications[i].notification
      const { 'sf:id': salesforceProjectId } = sobject
      if (sobject['sf:location__c']) {
        const location = await findAndCreateLocationProject(salesforceProjectId, sfApi)
        done(null, location)
      } else {
        const project = await findAndCreateMasterProject(sobject['sf:master_project__c'], sfApi)
        done(null, project)
      }
    }
  } catch (error) {
    console.log(error)
    done(error, null)
  }
}

function hooks(queue, { sfApi }) {
  queue.on('completed', (job, res) => checkForSignout(queue, sfApi))
  queue.on('failed', (job, res) => checkForSignout(queue, sfApi))
}

async function checkForSignout(queue, sfApi) {
  const waiting = await queue.getWaitingCount()
  const active = await queue.getActiveCount()
  if (waiting === 0 && active === 0) {
    console.log('Signing Out')
    await sfApi.signOut()
  }
}
async function findLocationPackages (inspireProjectId, Location__c, sfApi) {
  const { Opportunity__c } = await sfApi.findInspireProject({ id: inspireProjectId }, ['Opportunity__c'])
  console.log({ Opportunity__c, Location__c })
  return sfApi.findLocationProduct({ Opportunity__c, Location__c }, ['Location__c', 'Package__c'])
}

async function findAndCreateLocationProject(salesforceProjectId, sfApi) {
  const { Master_Project__c: salesforce_project_id, Location__c: locationId, Inspire_Project__c: inspireProjectId } = await sfApi.findProject({ Id: salesforceProjectId }, ['Master_Project__c', 'Location__c', 'Inspire_Project__c'])
  const { Country__c: country, Vertical__c: vertical, Name: name, Website_URL__c: url, Address__c: street_address_1, Zip__c: postal_code, Domain_Type__c: domainType, State__c: stateC } = await sfApi.findLocation({ Id: locationId }, ['Name', 'Website_URL__c', 'Domain_Type__c', 'Address__c', 'Zip__c', 'State__c', 'Vertical__c', 'Country__c'])
  const { value: state } = states.US.options.find(state => state.text === stateC)
  const locationPackages = await findLocationPackages(inspireProjectId, locationId, sfApi)
  console.log({ locationPackages })
  const locationPackagesIds = locationPackages.filter(l => l.Package__c).map(l => l.Package__c)
  const sfPackageMap = await sfApi.findPackagesByid(locationPackagesIds, ['Id', 'Name'])
    .then(packages => packages.map((p) => {
      const { Id, Name } = p
      return { salesforceId: Id, name: Name }
    }))
  const packages = []
  for (let i = 0; i < sfPackageMap.length; i++) {
    const p = sfPackageMap[i]
    const { salesforceId, name } = p
    const [dbPackage] = await models.package.findOrCreate({
      where: { salesforceId },
      defaults: {
        name,
        salesforceId
      }
    })
    packages.push(dbPackage)
  }
  const locationSeeder = new LocationPropertiesSeeder({ name, url, street_address_1, postal_code, domainType, state, vertical, country })
  const properties = await locationSeeder.createLocationProps()
  const location = await models.location.create({
    locationProjectId: salesforceProjectId,
    properties
    // properties: { name, url, street_address_1: address, postal_code: zip, domainType, state: state || null, vertical, country }
  })
  // Create Packages
  await location.addPackages(packages)
  let project = await models.project.findOne({ where: { salesforce_project_id } })
  if (!project) {
    project = await findAndCreateMasterProject(salesforce_project_id, sfApi)
  }
  return location.update({ projectId: project.dataValues.id, hooks: false })
}

async function findAndCreateMasterProject(salesforceProjectId, sfApi) {
  let dbAccount = { id: null }
  const sfProject = await sfApi.findProject({ Id: salesforceProjectId }, ['Project_Name__c', 'Inspire_Project__c', 'Property_Management_Company__c'])
  if (sfProject.Property_Management_Company__c) {
    dbAccount = models.salesforceAccount.findOne({
      where: {
        salseforceId: sfProject.Property_Management_Company__c
      }
    })
    if (!dbAccount) {
      const sfAccount = await sfApi.findAccount({ id: sfProject.Property_Management_Company__c }, ['Name'])
      dbAccount = await models.salesforceAccount.create({
        name: sfAccount.Name,
        salseforceId: sfProject.Property_Management_Company__c
      }).then(a => a.toJSON())
    }
  }
  if (sfProject.Inspire_Project__c) {
    const inspireProject = await sfApi.findInspireProject({ Id: sfProject.id }, ['Project_Revenue_Type__c', 'Contract_Signed_Date__c', 'inspire1__Project_Status__c', 'inspire1__Owner_Name__c', 'Name'])
    return models.project.create({
      salesforceAccountId: dbAccount.id,
      salesforce_project_id: salesforceProjectId,
      project_type: inspireProject.Project_Revenue_Type__c,
      project_name: sfProject.Project_Name__c,
      project_manager: inspireProject.inspire1__Owner_Name__c
    })
  }
}
