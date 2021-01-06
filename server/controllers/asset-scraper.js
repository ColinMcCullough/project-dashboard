const axios = require('axios')
const getBearerToken = require('../controllers/google-auth/index')
const assetScraperUrl = process.env.ASSET_SCRAPER_URL

module.exports = assetScraper

/**
 * Calls cloud computed function link discoverer
 * @param {String} url
 * @returns {Array} data
 * @throws {Error} Invalid arguement error / invalid response
 */
async function assetScraper(data, topicName) {
  if (!assetScraperUrl) {
    throw new Error('Invalid arguement passed in')
  }
  // const bearerToken = devToken || await getBearerToken(linkDiscovererUrl)
  const postUrl = assetScraperUrl
  const body = data
  // const config = {
  //   headers: { Authorization: `Bearer ${bearerToken}` }
  // }
  const res = await axios.post(postUrl, body)
  if (res.status !== 200) { throw new Error(`Link discoverer Failed: Status ${res.status}`) }
  return res.data
}
