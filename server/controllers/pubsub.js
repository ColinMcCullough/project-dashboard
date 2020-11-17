const { PubSub } = require('@google-cloud/pubsub')
module.exports = {
  createAndSubscribe,
  deleteTopicAndSub
}

/**
 *
 *
 * @param {*} projectId
 * @param {*} topicName
 * @param {*} subscriptionName
 * @returns subscription
 */
async function createAndSubscribe(projectId, topicName, subscriptionName) {
  console.log(projectId, topicName, subscriptionName)
  // Instantiates a client
  // Creates a new topic
  const pubsub = new PubSub({ projectId })
  const [topic] = await pubsub.createTopic(topicName)
  console.log(`Topic ${topic.name} created.`)
  const [subscription] = await topic.createSubscription(subscriptionName, { enableMessageOrdering: true })
  console.log(`Subscription ${subscriptionName} created`)
  return subscription
}

async function deleteTopicAndSub(topicName, subName, projectId) {
  try {
    const pubsub = new PubSub({ projectId })
    console.log('deleting topic')
    // await pubsub.subscription(subName).delete()
    // console.log('deleting sub')
    // return pubsub.detachSubscription(subName)
    return pubsub.topic(topicName).delete()
  } catch (error) {
    console.error(error)
  }
}
