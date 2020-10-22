const discoverLinks = require('../../controllers/google-auth')

module.exports = (app) => {
  app.post('/link-dicoverer', (req, res) => {
    const request = require('request-promise')
    const { LINK_DISCOVERER_URL: receivingServiceURL, DISCOVER_URL } = process.env

    // Set up metadata server request
    // See https://cloud.google.com/compute/docs/instances/verifying-instance-identity#request_signature
    const metadataServerTokenURL = 'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience='
    const tokenRequestOptions = {
      uri: metadataServerTokenURL + receivingServiceURL,
      headers: {
        'Metadata-Flavor': 'Google'
      }
    }
    // Fetch the token, then provide the token in the request to the receiving service
    request(tokenRequestOptions)
      .then((token) => {
        return request({
          method: 'POST',
          uri: DISCOVER_URL,
          body: {
            
            url: 'http://all-americanselfstorage.com/'
          },
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
