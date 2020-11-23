const models = require('../../../models')

module.exports = {
  processor,
  concurrency: 1,
  hooks,
  takesSfApi: true
}

async function processor(job, sfApi) {
  if (!sfApi.isLoggedIn) {
    console.log('Signing In')
    await sfApi.signIn()
  }
  // throw new Error('Ok')
  const { data } = job
  const { notifications } = data['soapenv:envelope']['soapenv:body']
  for (let i = 0; i < notifications.length; i++) {
    const { sobject } = notifications[i].notification
    const { 'sf:id': salesforceProjectId } = sobject
    if (sobject['sf:location__c']) {
      // create locations
      console.log('looking for project')
      const SFproject = await sfApi.findProject({ Id: salesforceProjectId }, ['Master_Project__c', 'Location__c'])
      console.log('found project')
      console.log(SFproject)
      throw new Error('ok')
      const { Master_Project__c: salesforce_project_id, Location__c } = project
      // fetch project__c info from sf based on id
      const { Name: name, Website_URL__c: url, Address__c: address, Zip__c: zip, Domain_Type__c: domainType } = await sfApi.findLocation({ Id: Location__c }, ['Name', 'Website_URL__c', 'Domain_Type__c', 'Address__c', 'Zip__c'])
      const location = await models.location.create({ properties: { name, url, address, zip, domainType } })
      const project = await models.project.findOne({ where: { salesforce_project_id } })
      if (project) {
        await location.update({ projectId: project.dataValues.id })
      } else {
        throw new Error('No associated Project')
      }
    } else {
      // create project
      // get the Project__c object for the id
      console.log('looking for project')
      const sfProject = await sfApi.findProject({ Id: salesforceProjectId }, ['Name', 'Inspire_Project__c'])
      console.log('found project')
      if (sfProject.Inspire_Project__c) {
        const inspireProject = await sfApi.findInspireProject({ Id: sfProject.id }, ['Master_Project__c', 'Project_Revenue_Type__c', 'Contract_Signed_Date__c', 'inspire1__Project_Status__c', 'inspire1__Owner_Name__c', 'Name'])
        // get the inspire1__project__c for the project
        // get Project_Revenue_Type__c, Contract_Signed_Date__c, inspire1__Project_Status__c, inspire1__Owner_Name__c
        const dbProject = await models.project.create({
          salesforce_project_id: inspireProject.Master_Project__c,
          project_type: inspireProject.Project_Revenue_Type__c,
          project_name: inspireProject.name,
          project_manager: inspireProject.inspire1__Owner_Name__c
        })
      }
    }
  }
}

function hooks(queue, sfApi) {
  queue.on('completed', (job, res) => checkForSignout(queue, sfApi))
  queue.on('failed', (job, res) => checkForSignout(queue, sfApi))
}

async function checkForSignout(queue, sfApiqueue, sfApi) {
  const waiting = await queue.getWaitingCount()
  const active = await queue.getActiveCount()
  if (waiting === 0 && active === 0) {
    console.log('Signing Out')
    await sfApi.signOut()
  }
}
