/* eslint-disable curly */
const assetScraper = require('../../asset-scraper')
// const { createAndSubscribe, deleteTopicAndSub } = require('../../pubsub')
const { GCP_PROJECT_ID } = process.env
const models = require('../../../models')

module.exports = {
  processor,
  concurrency: 1,
  hooks,
  takesSfApi: false
}

async function processor(job, done, apis) {
  try {
    const res = await assetScraper(job.data, null)
    done(null, res)
  } catch (error) {
    done(error)
  }
}
// async function processor(job, done) {
//   try {
//     const { id } = job
//     const topicName = `assetScraper_${id}`
//     const subscriptionName = `${topicName}_projectDashboard`
//     const subscription = await createAndSubscribe(GCP_PROJECT_ID, topicName, subscriptionName)
//     subscription.on('message', async (message) => {
//       message.ack()
//       const data = JSON.parse(message.data.toString())
//       const { progress, complete, log, results, error } = data
//       if (progress) await job.progress(progress)
//       if (log) job.log(log)
//       if (error) job.log(error)
//       if (complete) done(null, results)
//     })
//     await assetScraper(job.data, topicName)
//   } catch (error) {
//     console.log(error)
//     done(error)
//   }
// }

// function processor (job, done) {
//   done(null, { errors: { 'https://solaire8250.com': {} }, amenities: {}, address: null, emails: {}, phoneNumbers: {} })
// }

function hooks(queue) {
  queue.on('completed', async (job, result) => {
    const { name, data } = job
    if (name === 'run') {
      try {
        await models.assetScraper.create({
          locationId: data.locationId,
          results: result
        })
        // const { id } = job
        // const topicName = `assetScraper_${id}`
        // const subscriptionName = `${topicName}_projectDashboard`
        // await deleteTopicAndSub(topicName, subscriptionName, GCP_PROJECT_ID)
      } catch (error) {
        console.error(error)
      }
    }
  })
}
