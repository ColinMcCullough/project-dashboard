const { REDIS_URL } = process.env
const path = require('path')
const fs = require('fs')
const Bull = require('bull')

class BullQueues {
  constructor(params) {
    if (!REDIS_URL) {
      throw new Error('No Redis url set')
    }
    if (BullQueues._instance) {
      throw new Error('BullQueues already has an instance!!!')
    }
    this.queues = {}
    this.directory = __dirname
    this.subDirectory = null
    this.files = null
    this.rejectedFiles = [
      'index.js',
      'README.md',
      'config.js'
    ]
    BullQueues._instance = this
  }

  getfileNames(dir) {
    return fs.readdirSync(dir || this.directory)
      .filter(file => file.indexOf('.') !== 0 && !this.rejectedFiles.includes(file))
  }

  createQueues() {
    this.getfileNames()
      .forEach((file) => {
        const fileName = this.getFileName(file)
        this.queues[fileName] = this.newQueue(fileName)
      })
  }

  newQueue (name) {
    const subDir = `${__dirname}/${name}`
    const queue = new Bull(name, REDIS_URL)
    this.getfileNames(subDir)
      .forEach((file) => {
        const { concurrency, processor } = require(path.join(subDir, file))
        const fileName = this.getFileName(file)
        queue.process(fileName, concurrency, processor)
      })
    return queue
  }

  getFileName(file) {
    return file.replace('.js', '')
  }
}

module.exports = new BullQueues()
