const { REDIS_URL } = process.env
const path = require('path')
const fs = require('fs')

module.exports = (name, Bull) => {
  const queue = new Bull(name, REDIS_URL)
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'README.md')
    .forEach((file) => {
      const { concurrency, processor } = require(path.join(__dirname, file))
      const fileName = file.replace('.js', '')
      queue.process(fileName, concurrency, processor)
    })
  return queue
}
