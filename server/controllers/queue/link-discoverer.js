module.exports = (Bull, redisUrl) => {
  return new Bull('link-discoverer', redisUrl)
}
