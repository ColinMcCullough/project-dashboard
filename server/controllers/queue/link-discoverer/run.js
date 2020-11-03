const linkDiscoverer = require('../../link-discoverer')
const { createAndSubscribe } = require('../../pubsub');

module.exports = {
  processor,
  concurrency: 1
}

async function processor(job, done) {
  const subscription = await createAndSubscribe()
  subscription.on('message', (message) => {
    console.log('Received message:', message.data)
    message.ack()
  })
  await linkDiscoverer(job.data.url)
}
