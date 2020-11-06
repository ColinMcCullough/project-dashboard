const assetScraper = require('../../asset-scraper')
const { createAndSubscribe, deleteTopicAndSub } = require('../../pubsub')
const { GCP_PROJECT_ID } = process.env
module.exports = {
  processor,
  concurrency: 1
}

async function processor(job, done) {
  try {
    const { id } = job
    const topicName = `assetScraper_${id}`
    const subscriptionName = `${topicName}_projectDashboard`
    const subscription = await createAndSubscribe(GCP_PROJECT_ID, topicName, subscriptionName)
    subscription.on('message', async (message) => {
      message.ack()
      const data = JSON.parse(message.data.toString())
      const { progress, complete, log, results, error } = data
      if (progress) {
        await job.progress(progress)
      }
      if (log) { job.log(log) }
      if (error) { job.log(error) }
      if (complete) {
        try {
          await deleteTopicAndSub(topicName, subscriptionName, GCP_PROJECT_ID)
        } catch (error) {
          console.error(error)
        }
        // TODO save data to the database
        done(null, results)
      }
    })
    await assetScraper(job.data, topicName)
  } catch (error) {
    console.log(error)
    done(error)
  }
}
