const linkDiscoverer = require('../../link-discoverer')
const { createAndSubscribe } = require('../../pubsub')
const { GCP_PROJECT_ID } = process.env
module.exports = {
  processor,
  concurrency: 1
}

async function processor(job, done) {
  const { id } = job
  const topicName = `linkDiscover_${id}`
  const subscriptionName = `${topicName}_projectDashboard`
  const subscription = await createAndSubscribe(GCP_PROJECT_ID, topicName, subscriptionName)
  subscription.on('message', (message) => {
    console.log('Received message:', message.data)
    message.ack()
  })
  await linkDiscoverer(job.data.url, topicName)
}
