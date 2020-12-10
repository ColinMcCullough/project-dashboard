const cld = require('../../controllers/cld')

module.exports = (app) => {
  app.get('/api/v1/cloudinary', async (req, res) => {
    try {
      const { prefix } = req.query
      const images = await cld.getImages(prefix)
      res.status(200).json(images)
    } catch (error) {
      console.error(error)
      res.sendStatus(503)
    }
  })
  // TODO switch this to DELETE
  app.post('/api/v1/cloudinary', async (req, res) => {
    const { id } = req.body
    const result = await cld.deleteImage(id)
    res.status(202).json(result)
  })

  app.delete('/api/v1/cloudinary', async (req, res) => {
    try {
      const result = await cld.deleteAllImagesInFolder(req.body)
      res.json(result)
    } catch (err) {
      res.send(err)
    }
  })
}
