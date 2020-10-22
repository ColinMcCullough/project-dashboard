const axios = require('axios')
const getBearerToken = require('../controllers/google-auth/index')
const linkDiscovererUrl = process.env.LINK_DISCOVERER_URL

module.exports = linkDiscoverer

/**
 * Calls cloud computed function link discoverer
 * @param {String} url
 * @returns {Array} data
 * @throws {Errror} Invalid arguement error / invalid response
 */
async function linkDiscoverer(url) {
  if (!linkDiscovererUrl) {
    throw Error('Invalid arguement passed in')
  }
  try {
    const devToken = process.env.TOKEN
    const bearerToken = devToken ? devToken : await getBearerToken(linkDiscovererUrl)
    const postUrl = `${linkDiscovererUrl}/discover`
    const body = { url }
    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` }
    }
    const res = await axios.post(postUrl, body, config)
    if (res.status !== 200) throw Error(`Link discoverer Failed: Status ${res.status}`)
    return res.data
  } catch(err) {
    return err
  }
}
