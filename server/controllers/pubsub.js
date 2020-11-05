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
  const [subscription] = await topic.createSubscription(subscriptionName)
  console.log(`Subscription ${subscriptionName} created`)
  return subscription
}

async function deleteTopicAndSub(topicName, subName, projectId) {
  const pubsub = new PubSub({ projectId })
  await pubsub.subscription(subName).delete()
  await pubsub.topic(topicName).delete()
}
