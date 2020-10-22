const axios = require('axios')
const token = require('../controllers/google-auth/index')
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
    const token = process.env.TOKEN
    console.log(token)
    const bearerToken = token ? token : await token(linkDiscovererUrl)
    const res = await axios({
      method: 'POST',
      url: `${LINK_DISCOVERER_URL}/discover`,
      body: { url },
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    })
    console.log(`Result:${res}`)
    if (res.status !== 200) throw Error(`Link discoverer Failed: Status ${res.status}`)
    return res.data
  } catch(err) {
    return err
  }
}
