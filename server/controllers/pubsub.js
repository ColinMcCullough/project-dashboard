const { PubSub } = require('@google-cloud/pubsub')

module.exports = {
  createAndSubscribe
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
  // Instantiates a client
  const pubsub = new PubSub({ projectId })
  // Creates a new topic
  const [topic] = await pubsub.createTopic(topicName)
  console.log(`Topic ${topic.name} created.`)
  const [subscription] = await topic.createSubscription(subscriptionName)
  console.log(`Subscription ${subscriptionName} created`)
  return subscription
}
