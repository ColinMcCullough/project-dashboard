const { go, queues } = require('../../../../server/controllers/queue')
describe('Queue Index', () => {
  test('index error', () => {
    go()
    console.log(queues)
    console.log('here')
  })
})