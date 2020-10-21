
const { GoogleAuth } = require('google-auth-library')
const axios = require('axios')
const auth = new GoogleAuth()

let client, serviceUrl

module.exports = async (body) => {
  if (!process.env.LINK_DISCOVERER_URL) throw Error('Service URL variable needs to be set.')
  serviceUrl = `${process.env.LINK_DISCOVERER_URL}/discover`
  const serviceRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body,
    timeout: 3000
  }

  try {
    if (!client) client = await auth.getIdTokenClient(serviceUrl)
    const clientHeaders = await client.getRequestHeaders()
    serviceRequestOptions.headers.Authorization = clientHeaders['Authorization']
  } catch(err) {
    throw Error('could not create an identity token: ', err)
  }

  try {
    console.log('pre-request', { serviceUrl, serviceRequestOptions })
    const serviceResponse = await axios(serviceUrl, serviceRequestOptions)
    console.log('post-request', { serviceResponse })
    return serviceResponse.body
  } catch (err) {
    throw Error('Failed: ', err)
  }
}
