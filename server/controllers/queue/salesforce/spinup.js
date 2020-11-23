const models = require('../../../models')
const sfApi = require('../../salesforce-api')
module.exports = {
  processor,
  concurrency: 1,
  hooks
}

async function processor(job) {
  const { data } = job
  const { notifications } = data['soapenv:envelope']['soapenv:body'][0]
  for (let i = 0; i < notifications.length; i++) {
    const { sobject } = notifications[i].notification
    const { 'sf:location__c': locationId, 'sf:id': salesforceProjectId } = sobject
    if (sobject['sf:location__c']) {
      // create locations
      const { Master_Project__c: salesforce_project_id, Location__c } = await sfApi.findProject({ Id: salesforceProjectId }, ['Master_Project__c', 'Location__c'])
      // fetch project__c info from sf based on id
      const { Name: name, Website_URL__c: url, Address__c: address, Zip__c: zip, Domain_Type__c: domainType } = await sfApi.findLocation({ Id: locationId }, ['Name', 'Website_URL__c', 'Domain_Type__c', 'Address__c', 'Zip__c'])
      const location = await models.location.create({ properties: { name, url, address, zip, domainType } })
      const project = await models.project.findOne({ where: { salesforce_project_id } })
      await location.update({ projectId: project.dataValues.id })
    } else {
      // create project
      // get the Project__c object for the id
      const sfProject = await sfApi.findProject({ Id: salesforceProjectId }, ['Name', 'Inspire_Project__c'])
      if (sfProject.Inspire_Project__c) {
        const inspireProject = await sfApi.findInspireProject({ Id: sfProject.id }, ['Project_Revenue_Type__c', 'Contract_Signed_Date__c', 'inspire1__Project_Status__c', 'inspire1__Owner_Name__c'])
        // get the inspire1__project__c for the project
        // get Project_Revenue_Type__c, Contract_Signed_Date__c, inspire1__Project_Status__c, inspire1__Owner_Name__c
        const dbProject = await models.project.create({
          salesforce_project_id: projectCreate.masterProjectId,
          project_type: inspireProject.Project_Revenue_Type__c,
          project_name: projectCreate.project_name,
          project_manager: inspireProject.inspire1__Owner_Name__c
        })
      }
    }
  }
}

function hooks(queue) {
}
