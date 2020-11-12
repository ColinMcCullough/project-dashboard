module.exports = {
  processor,
  concurrency: 1,
  hooks
}

async function processor(job) {
  const { data } = job
  throw new Error('Hold for Later')
}

function hooks (queue) {
}
