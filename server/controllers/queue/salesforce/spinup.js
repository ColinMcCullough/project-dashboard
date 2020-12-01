const models = require('../../../models')

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
        const project = await findAndCreateMasterProject(salesforceProjectId, sfApi)
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

async function findAndCreateLocationProject (salesforceProjectId, sfApi) {
  const { Master_Project__c: salesforce_project_id, Location__c: locationId } = await sfApi.findProject({ Id: salesforceProjectId }, ['Master_Project__c', 'Location__c'])
  const { Vertical__c: vertical, Name: name, Website_URL__c: url, Address__c: address, Zip__c: zip, Domain_Type__c: domainType, State__c: state } = await sfApi.findLocation({ Id: locationId }, ['Name', 'Website_URL__c', 'Domain_Type__c', 'Address__c', 'Zip__c', 'State__c', 'Vertical__c'])
  const location = await models.location.create({ properties: { name, url, address, zip, domainType, state, vertical } })
  let project = await models.project.findOne({ where: { salesforce_project_id } })
  if (!project) {
    project = await findAndCreateMasterProject(salesforce_project_id, sfApi)
  }
  return location.update({ projectId: project.dataValues.id })
}

async function findAndCreateMasterProject (salesforceProjectId, sfApi) {
  const sfProject = await sfApi.findProject({ Id: salesforceProjectId }, ['Name', 'Inspire_Project__c'])
  if (sfProject.Inspire_Project__c) {
    const inspireProject = await sfApi.findInspireProject({ Id: sfProject.id }, ['Project_Revenue_Type__c', 'Contract_Signed_Date__c', 'inspire1__Project_Status__c', 'inspire1__Owner_Name__c', 'Name'])
    return models.project.create({
      salesforce_project_id: salesforceProjectId,
      project_type: inspireProject.Project_Revenue_Type__c,
      project_name: sfProject.Name,
      project_manager: inspireProject.inspire1__Owner_Name__c
    })
  }
}
