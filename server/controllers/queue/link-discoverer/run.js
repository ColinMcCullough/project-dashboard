/* eslint-disable curly */
const linkDiscoverer = require('../../link-discoverer')
// const { createAndSubscribe, deleteTopicAndSub } = require('../../pubsub')
const { GCP_PROJECT_ID } = process.env
const models = require('../../../models')
module.exports = {
  processor,
  concurrency: 1,
  hooks
}

async function processor(job, done, apis) {
  try {
    const res = await linkDiscoverer(job.data.url, null)
    done(null, res)
  } catch (error) {
    done(error)
  }
}

// async function processor(job, done) {
//   try {
//     const { id } = job
//     const topicName = `linkDiscover_${id}`
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
//     await linkDiscoverer(job.data.url, topicName)
//   } catch (error) {
//     console.log(error)
//     done(error)
//   }
// }
function hooks(queue) {
  queue.on('completed', async (job, result) => {
    const { name, data } = job
    if (name === 'run') {
      console.log({ result })
      try {
        await models.linkDiscoverer.create({
          locationId: data.locationId,
          pages: result
        })
        // const { id } = job
        // const topicName = `linkDiscover_${id}`
        // const subscriptionName = `${topicName}_projectDashboard`
        // await deleteTopicAndSub(topicName, subscriptionName, GCP_PROJECT_ID)
      } catch (error) {
        console.error(error)
      }
    }
  })
}
