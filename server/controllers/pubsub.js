const { PubSub } = require('@google-cloud/pubsub')
module.exports = {
  createAndSubscribe,
  deleteTopic
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

function deleteTopic(topicName, subName, projectId) {
  const pubsub = new PubSub({ projectId })
  return pubsub.topic(topicName).delete()
}
