const linkDiscoverer = require('../../link-discoverer')
module.exports = {
  processor,
  concurrency: 1
}

function processor(job) {
  return linkDiscoverer(job.data.url)
}
