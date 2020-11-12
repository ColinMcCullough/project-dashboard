const xmlParse = require('express-xml-bodyparser')

module.exports = (app) => {
  app.use('/api/v1/new-project', xmlParse())
  app.post('/api/v1/new-project', async (req, res) => {
    try {
      const { body } = req
      console.log(body)
      res.set('Content-Type', 'text/xml')
      res.status(201).send(`
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <notificationsResponse
              xmlns:ns2="urn:sobject.enterprise.soap.sforce.com"
              xmlns="http://soap.sforce.com/2005/09/outbound"
            >
              <Ack>true</Ack>
            </notificationsResponse>
          </soap:Body>
        </soap:Envelope>
      `)
    } catch (error) {
      res.sendStatus(503)
    }
  })
}
