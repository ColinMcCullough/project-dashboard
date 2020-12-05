const models = require('../../../models')
const states = require('../../../config/states')
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

async function findAndCreateLocationProject(salesforceProjectId, sfApi) {
  const { Master_Project__c: salesforce_project_id, Location__c: locationId } = await sfApi.findProject({ Id: salesforceProjectId }, ['Master_Project__c', 'Location__c'])
  const { Country__c: country, Vertical__c: vertical, Project_Name__c: name, Website_URL__c: url, Address__c: address, Zip__c: zip, Domain_Type__c: domainType, State__c: stateC } = await sfApi.findLocation({ Id: locationId }, ['Project_Name__c', 'Website_URL__c', 'Domain_Type__c', 'Address__c', 'Zip__c', 'State__c', 'Vertical__c', 'Country__c'])
  const { value: state } = states.US.options.find(state => state.text === stateC)
  const location = await models.location.create({ properties: { name, url, address, zip, domainType, state: state || null, vertical, country } })
  let project = await models.project.findOne({ where: { salesforce_project_id } })
  if (!project) {
    project = await findAndCreateMasterProject(salesforce_project_id, sfApi)
  }
  return location.update({ projectId: project.dataValues.id })
}

async function findAndCreateMasterProject(salesforceProjectId, sfApi) {
  let dbAccount = { id: null }
  const sfProject = await sfApi.findProject({ Id: salesforceProjectId }, ['Name', 'Inspire_Project__c', 'Property_Management_Company__c'])
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
      project_name: sfProject.Name,
      project_manager: inspireProject.inspire1__Owner_Name__c
    })
  }
}
