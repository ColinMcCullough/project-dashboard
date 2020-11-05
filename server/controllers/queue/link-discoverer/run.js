const linkDiscoverer = require('../../link-discoverer')
const { createAndSubscribe, deleteTopic } = require('../../pubsub')
const { GCP_PROJECT_ID } = process.env
module.exports = {
  processor,
  concurrency: 1
}

async function processor(job, done) {
  try {
    const { id } = job
    console.log('id', id)
    const topicName = `linkDiscover_${id}`
    console.log('topicName', topicName)
    const subscriptionName = `${topicName}_projectDashboard`
    console.log('subscriptionName', subscriptionName)
    const subscription = await createAndSubscribe(GCP_PROJECT_ID, topicName, subscriptionName)
    subscription.on('message', async (message) => {
      console.log('Received message:', message)
      const data = JSON.parse(message.data.toString())
      const { progress, complete, log, results, error } = data
      console.log('progress', progress)
      await job.progress(progress)
      if (log) { job.log(log) }
      if (error) { job.log(error) }
      if (complete) {
        await deleteTopic(topicName, subscriptionName, GCP_PROJECT_ID)
        // TODO save data to the database
        done(null, results)
      }
    })
    await linkDiscoverer(job.data.url, topicName)
  } catch (error) {
    console.log(error)
    done(error)
  }
}
