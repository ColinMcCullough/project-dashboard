const axios = require('axios')

module.exports = async (body) => {
  if (!process.env.LINK_DISCOVERER_URL) throw Error('Service URL variable needs to be set.')

  const { LINK_DISCOVERER_URL } = process.env
  const metadataServerTokenURL = 'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience='
  const tokenRequestOptions = {
    uri: metadataServerTokenURL + LINK_DISCOVERER_URL,
    headers: { 'Metadata-Flavor': 'Google' }
  }
  return await axios(tokenRequestOptions)
    .then(async (token) => {
      return await axios({
        method: 'POST',
        uri: `${LINK_DISCOVERER_URL}/discover`,
        body: { url },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    })
}
