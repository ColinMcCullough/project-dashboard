const axios = require('axios')
const getBearerToken = require('../controllers/google-auth/index')
const linkDiscovererUrl = process.env.LINK_DISCOVERER_URL

module.exports = linkDiscoverer

/**
 * Calls cloud computed function link discoverer
 * @param {String} url
 * @returns {Array} data
 * @throws {Error} Invalid arguement error / invalid response
 */
async function linkDiscoverer(url, topicName) {
  if (!linkDiscovererUrl) {
    throw new Error('Invalid arguement passed in')
  }
  const devToken = process.env.TOKEN
  // const bearerToken = devToken || await getBearerToken(linkDiscovererUrl)
  const postUrl = linkDiscovererUrl
  const body = { url, topicName }
  // const config = {
  //   headers: { Authorization: `Bearer ${bearerToken}` }
  // }
  console.log('postUrl', postUrl)
  const res = await axios.post(postUrl, body)
  console.log(res)
  if (res.status !== 200) { throw new Error(`Link discoverer Failed: Status ${res.status}`) }
  return res.data
}
