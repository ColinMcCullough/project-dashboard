const { REDIS_URL } = process.env
const path = require('path')
const fs = require('fs')
const Bull = require('bull')

if (!REDIS_URL) {
  throw new Error('No Redis url set')
}
getfilesInDir(__dirname)
  .forEach((file) => {
    const fileName = file.replace('.js', '')
    module.exports[fileName] = newQueue(fileName, Bull)
  })

function newQueue (name, Bull) {
  const subDir = `${__dirname}/${name}`
  const queue = new Bull(name, REDIS_URL)
  getfilesInDir(subDir)
    .forEach((file) => {
      const { concurrency, processor } = require(path.join(subDir, file))
      const fileName = file.replace('.js', '')
      queue.process(fileName, concurrency, processor)
    })
  return queue
}

function getfilesInDir(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'README.md' && file !== 'config.js')
}
