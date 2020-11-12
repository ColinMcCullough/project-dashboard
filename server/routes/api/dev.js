const { queues } = require('../../controllers/queue')
module.exports = (app) => {
  app.get('/api/v1/dev', async (req, res) => {
    const { 'asset-scraper': assetScraper } = queues
    const body = { locationId: '4', rootProtocol: 'https', rootdomain: 'solaire8250.com', pages: ['https://solaire8250.com'], scrapers: { photos: true, amenities: true, address: true, emails: true, phoneNumber: true }, template: { address: { selector: '', example: '#address-block' }, phone: { selector: '', example: '#phone-block' }, email: { selector: '', example: '#address-block' }, amenities: { selector: '.row .wp-block-columns .wp-block-column ul li', example: '.row .wp-block-columns', slug: 'features-amenities' } } }
    await assetScraper.add('run', body)
    res.sendStatus(200)
  })
}
