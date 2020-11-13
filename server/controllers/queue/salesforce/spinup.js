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
      clientName: null
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
    await models.project.create({
      salesforce_project_id,
      ...projectCreate
    })
  }
}

function hooks(queue) {
}
