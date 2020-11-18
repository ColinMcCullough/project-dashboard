const models = require('../../../models')
module.exports = {
  processor,
  concurrency: 1,
  hooks
}

async function processor(job) {
  const { data } = job
  const { notifications } = data['soapenv:envelope']['soapenv:body'][0]
  for (let i = 0; i < notifications.length; i++) {
    const project = notifications[0].notification[0].sobject[0]
    const projectCreate = {
      project_name: null,
      project_type: null,
      clientName: null,
      locationId: null,
      masterProjectId: null,
      accountName: null
    }
    const salesforce_project_id = project['sf:id'][0]
    if (project['sf:project_name__c']) {
      projectCreate.project_name = project['sf:project_name__c'][0]
    }
    if (project['sf:project_revenue_type__c']) {
      projectCreate.project_type = project['sf:project_revenue_type__c'][0]
    }
    if (project['sf:account_name_text__c']) {
      projectCreate.clientName = project['sf:account_name_text__c'][0]
    }
    if (project['sf:Master_Project__c']) {
      projectCreate.masterProjectId = project['sf:Master_Project__c']
    }
    if (project['sf:location__c']) {
      projectCreate.locationId = project['sf:location__c']
    }

    if (projectCreate.accountName) {
      // create project
      // get the Project__c object for the id
      // get the inspire1__project__c for the project
      // get Project_Revenue_Type__c, Contract_Signed_Date__c, inspire1__Project_Status__c, inspire1__Owner_Name__c
      const dbProject = await models.project.create({
        salesforce_project_id,
        ...projectCreate
      })
    } else if (projectCreate.locationId) {
      // create locations
      const { locationId } = projectCreate
      // fetch project__c info from sf based on id
      // fetch the location__c from the project__c to get Name, Website_URL__c, Domain_Type__c, Address__c, Zip__c
      const location = await models.location.create({
        properties: {
          name,
          url: null
        }
      })
    }
  }
}

function hooks(queue) {
}
