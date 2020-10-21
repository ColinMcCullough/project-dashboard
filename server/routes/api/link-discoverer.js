const discoverLinks = require('../../controllers/google-auth')
const axios = require('axios')

module.exports = (app) => {
  app.post('/api/v1/discover', (req, res) => {
    const { url } = req.body
    const { LINK_DISCOVERER_URL } = process.env
    const metadataServerTokenURL = 'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience='
    const tokenRequestOptions = {
      uri: metadataServerTokenURL + LINK_DISCOVERER_URL,
      headers: { 'Metadata-Flavor': 'Google' }
    }
    axios(tokenRequestOptions)
      .then((token) => {
        return axios({
          method: 'POST',
          uri: `${LINK_DISCOVERER_URL}/discover`,
          body: { url },
          json: true
        }).auth(null, null, true, token)
      })
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((error) => {
        res.status(400).send(error)
      })
  })
}
