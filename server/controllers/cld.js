const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
  getImages(prefix) {
    return new Promise((res, rej) => {
      cloudinary.v2.api.resources({
        type: 'upload',
        tags: true,
        prefix
      }, (err, resources) => {
        if (!err) {
          // console.log(resources)
          res(resources)
        } else {
          console.error(err)
          rej(err)
        }
      })
    })
  },
  updateImageTags(id, tags) {
    return new Promise((res, rej) => {
      cloudinary.v2.api.update(id, { tags }, (err, result) => {
        if (!err) {
          res(result)
        } else {
          rej(err)
        }
      })
    })
  },
  deleteAllImagesInFolder(prefix) {
    console.log(prefix)
    return new Promise((res, rej) => {
      if (!prefix || prefix === '/') {
        rej('Prefix is required!')
      } else {
        cloudinary.v2.api.delete_resources_by_prefix(prefix, (err, result) => {
          if (!err) {
            res(result)
          } else {
            rej(err)
          }
        })
      }
    })
  },
  /**
   * @param {String || Array} id
   */
  deleteImage(id) {
    return new Promise((res, rej) => {
      cloudinary.v2.api.delete_resources(id, (err, result) => {
        if (!err) {
          console.log(result)
          res(result)
        } else {
          rej(err)
        }
      })
    })
  }
}