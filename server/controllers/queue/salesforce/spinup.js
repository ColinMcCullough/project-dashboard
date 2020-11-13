const models = require('../../../models')
module.exports = {
  processor,
  concurrency: 1,
  hooks
}

async function processor(job) {
  const { data } = job
  const { notifications } = data['soapenv:envelope']['soapenv:body'][0]
  const project = notifications[0].notification[0].sobject[0]
  const salesforce_project_id = project['sf:id'][0]
  const project_name = project['sf:project_name__c'][0]
  const project_type = project['sf:project_revenue_type__c'][0]
  const clientName = project['sf:account_name_text__c'][0]
  await models.project.create({
    salesforce_project_id,
    project_name,
    project_type
  })
  throw new Error('Hold for Later')
}

function hooks (queue) {
}
