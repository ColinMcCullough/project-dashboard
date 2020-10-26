require('dotenv').config()
const bullQueue = require('../../../../server/controllers/queue')
describe('Queue Index', () => {
  beforeAll(() => {
    return bullQueue.createQueues()
  })
  test('index error', () => {
    bullQueue.redisUrl = null
    let err
    try {
      bullQueue.createQueues()
    } catch (error) {
      err = error.message
    }
    expect(err).toBe('No Redis url set')
  })
  test('No Error', () => {
    let err = null
    bullQueue.redisUrl = process.env.REDIS_URL
    try {
      bullQueue.createQueues()
    } catch (error) {
      err = error.message
    }
    expect(Object.keys(bullQueue.queues).length).toBeGreaterThan(1)
    expect(err).toBe(null)
  })
})
