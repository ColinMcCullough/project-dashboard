const queue = require('../../controllers/queue')
const { queues } = require('../../controllers/queue')
const models = require('../../models')
module.exports = (app) => {
  app.get('/api/v1/jobs', (req, res) => {
    res.json(Object.keys(queue))
  })

  app.post('/api/v1/jobs/asset-scraper', async (req, res) => {
    const body = req.body
    const { 'asset-scraper': assetScraper } = queues
    await assetScraper.add('run', body)
    res.sendStatus(200)
  })
  app.post('/api/v1/jobs/link-discoverer', async (req, res) => {
    const body = req.body
    const { 'link-discoverer': linkDiscoverer } = queues
    try {
      await linkDiscoverer.add('run', body)
      res.sendStatus(200)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })

  app.post('/api/v1/jobs/link-discoverer/:projectId', async (req, res) => {
    try {
      const { 'link-discoverer': linkDiscoverer } = queues
      const { projectId } = req.params
      const projectLocations = await models.project.findOne({
        where: {
          salesforce_project_id: projectId
        },
        include: [
          {
            model: models.location
          }
        ]
      })
      const { locations } = projectLocations.toJSON()
      for (let i = 0; i < locations.length; i++) {
        const { url } = locations[i].properties
        const { id } = locations[i]
        await linkDiscoverer.add('run', { url, locationId: id })
      }
      res.sendStatus(200)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })
  app.post('/api/v1/jobs/asset-scraper/:projectId', async (req, res) => {
    try {
      const { 'asset-scraper': assetScraper } = queues
      const { body } = req
      for (let i = 0; i < body.length; i++) {
        const scrapers = {
          photos: true,
          amenities: true,
          address: true,
          emails: true,
          phoneNumber: true,
          social: true
        }
        const template = {
          address: {
            selector: null
          },
          phone: {
            selector: null
          },
          email: {
            selector: null
          },
          amenities: {
            selector: null,
            slug: null
          }
        }
        if (!body.template) {
          body.template = template
        }
        if (!body.scrapers) {
          body.scrapers = scrapers
        }
        const config = { photos: { folder: `onboarding/${body[i].locationId}` } }
        await assetScraper.add('run', { ...body[i], config })
      }
      res.sendStatus(200)
    } catch (e) {
      res.status(500).send(e.message)
    }
  })

  // app.get('/api/v1/jobs/dev', async (req, res) => {
  //   const { salesforce } = queues
  //   const body = { 'soapenv:envelope': { $: { 'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/', 'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema', 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance' }, 'soapenv:body': { notifications: [{ $: { xmlns: 'http://soap.sforce.com/2005/09/outbound' }, organizationid: '00Do0000000IWfaEAG', actionid: '04k3l000000PVDKAA4', sessionid: { $: { 'xsi:nil': 'true' } }, enterpriseurl: 'https://g5.my.salesforce.com/services/Soap/c/50.0/00Do0000000IWfa', partnerurl: 'https://g5.my.salesforce.com/services/Soap/u/50.0/00Do0000000IWfa', notification: { id: '04l3l00000pcMGcAAM', sobject: { $: { 'xsi:type': 'sf:Project__c', 'xmlns:sf': 'urn:sobject.enterprise.soap.sforce.com' }, 'sf:id': 'a0E3l00000KzBzIEAV', 'sf:location__c': 'a0g3l00000Ge9kdAAB', 'sf:master_project__c': 'a0E3l00000KzBz2EAF', 'sf:project_name__c': '#17239 Upsell-Acco Management-Redesign-2', 'sf:total_locations__c': '0.0' } } }] } } }
  //   await salesforce.add('spinup', body)
  //   res.sendStatus(200)
  // })
}
