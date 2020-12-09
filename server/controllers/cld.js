const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
  getImages,
  updateImageTags,
  deleteAllImagesInFolder,
  deleteImage
}
async function getImages(prefix) {
  try {
    let moreImages = true
    const resources = []
    const options = {
      type: 'upload',
      tags: true,
      prefix,
      max_results: 500
    }
    while (moreImages) {
      const response = await getImageBatch(options)
      resources.push(...response.resources)
      if (!response.next_cursor) {
        moreImages = false
      } else {
        options.next_cursor = response.next_cursor
      }
    }
    return { resources }
  } catch (err) {
    console.log(err)
  }
}
function getImageBatch(options) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.resources(options, (err, resources) => {
      if (!err) {
        resolve(resources)
      } else {
        reject(err)
      }
    })
  })
}
function updateImageTags(id, tags) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.update(id, { tags }, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}
function deleteAllImagesInFolder(prefix) {
  return new Promise((resolve, reject) => {
    if (!prefix || prefix === '/') {
      reject(new Error('Prefix is required!'))
    } else {
      cloudinary.v2.api.delete_resources_by_prefix(prefix, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    }
  })
}
/**
 * @param {String || Array} id
 */
function deleteImage(id) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.delete_resources(id, (err, result) => {
      if (!err) {
        console.log(result)
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}
