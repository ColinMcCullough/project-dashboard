const axios = require('axios')


module.exports = getBearerToken

/**
 * Fetches bearerToken
 * @param {String} cloudRunUrl
 * @returns {String} token
 * @throws {Errror} Invalid arguement error / invalid response
 */
async function getBearerToken(cloudRunUrl) {
  if (!cloudRunUrl) throw Error('No cloud run url passed into function')
  const metadataServerTokenURL = 'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience='
  const tokenRequestOptions = {
    url: metadataServerTokenURL + cloudRunUrl,
    headers: { 'Metadata-Flavor': 'Google' }
  }
  const res = await axios(tokenRequestOptions)
  if (res.status !== 200) throw Error(`Failed: Status ${res.status}`)
  return res.data
}
