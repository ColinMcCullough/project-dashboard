const xmlParse = require('express-xml-bodyparser')
const { queues } = require('../../controllers/queue')
const { removeNestedArrays } = require('../../utilities/object')
const { salesforce } = queues
module.exports = (app) => {
  app.use('/api/v1/new-project', xmlParse())
  app.use('/api/v1/xml/project', xmlParse())
  app.post('/api/v1/xml/project', async (req, res) => {
    try {
      const { body } = req
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
      // const data = removeNestedArrays(body)
      await salesforce.add('spinup', body)
    } catch (error) {
      res.sendStatus(503)
    }
  })
  // app.post('/api/v1/new-project', async (req, res) => {
  //   try {
  //     const { body } = req
  //     res.set('Content-Type', 'text/xml')
  //     res.status(201).send(`
  //       <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  //         <soap:Body>
  //           <notificationsResponse
  //             xmlns:ns2="urn:sobject.enterprise.soap.sforce.com"
  //             xmlns="http://soap.sforce.com/2005/09/outbound"
  //           >
  //             <Ack>true</Ack>
  //           </notificationsResponse>
  //         </soap:Body>
  //       </soap:Envelope>
  //     `)
  //     await salesforce.add('spinup', body)
  //   } catch (error) {
  //     res.sendStatus(503)
  //   }
  // })
}
