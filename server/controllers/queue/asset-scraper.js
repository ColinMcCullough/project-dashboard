module.exports = (Bull, redisUrl) => {
  return new Bull('asset-scraper', redisUrl)
}
