module.exports = (app) => {
  app.post('/link-dicoverer', (req, res) => {
    // const { url } = req.body
    const request = require('request-promise')
    const { LINK_DISCOVERER_URL: receivingServiceURL, DISCOVER_URL } = process.env
    const metadataServerTokenURL = 'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience='
    const tokenRequestOptions = {
      uri: metadataServerTokenURL + receivingServiceURL,
      headers: { 'Metadata-Flavor': 'Google' }
    }

    request(tokenRequestOptions)
      .then((token) => {
        return request({
          method: 'POST',
          uri: DISCOVER_URL,
          body: {
            url: 'http://all-americanselfstorage.com/'
            // url
          },
          json: true
        }).auth(null, null, true, token)
      })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error))
  })
}