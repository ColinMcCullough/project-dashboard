const { REDIS_URL: redisUrl } = process.env
const path = require('path')
const fs = require('fs')
const Bull = require('bull')
const sfApi = require('../salesforce-api')

const apis = {
  sfApi
}
class BullQueues {
  constructor(params) {
    this.queues = {}
    this.redisUrl = params.redisUrl
    this.directory = __dirname
    this.subDirectory = null
    this.files = null
    this.rejectedFiles = [
      'index.js',
      'README.md',
      'config.js'
    ]
  }

  getfileNames(dir) {
    return fs.readdirSync(dir || this.directory)
      .filter(file => file.indexOf('.') !== 0 && !this.rejectedFiles.includes(file))
  }

  createQueues() {
    if (!this.redisUrl) {
      throw new Error('No Redis url set')
    }
    this.getfileNames()
      .forEach((file) => {
        const fileName = this.getFileName(file)
        this.queues[fileName] = this.newQueue(fileName)
      })
  }

  newQueue (name) {
    const subDir = `${__dirname}/${name}`
    const queue = new Bull(name, this.redisUrl, { prefix: 'projectDashboard' })
    this.getfileNames(subDir)
      .forEach((file) => {
        const { concurrency, processor, hooks } = require(path.join(subDir, file))
        const fileName = this.getFileName(file)
        hooks(queue, apis)
        queue.process(fileName, concurrency, (job, done) => processor(job, done, apis))
      })
    return queue
  }

  getFileName(file) {
    return file.replace('.js', '')
  }
}

module.exports = new BullQueues({ redisUrl })
