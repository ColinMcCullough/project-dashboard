describe('Link Discoverer Queue', () => {
  test('Run', () => {
    const run = require('../../../../server/controllers/queue/link-discoverer/run')
    expect(run).toHaveProperty('processor')
    expect(run).toHaveProperty('concurrency', 1)
  })
})
