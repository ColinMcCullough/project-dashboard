const demo = 'decron-3/my83u8uwjqujdgy4szp4.jpg'
export default {
  data() {
    return {
      images: [],
      src: this.$cloudinary.image.url(
        demo,
        {
          width: '200',
          height: 200,
          crop: 'fill'
        }
      )
    }
  },
  methods: {
    async deleteImg (id) {
      const msg = await this.$axios.$post('api/v1/cloudinary', { id })
      this.images.splice(this.images.findIndex(img => img.public_id === id), 1)
      this.$emit('delete-res', msg)
    },
    getUrl (path) {
      return this.$cloudinary.image.url(
        path,
        {
          width: '200',
          height: 200,
          crop: 'fill'
        }
      )
    },
    async getImagesByFolder (prefix) {
      const images = await this.$axios.$get(`api/v1/cloudinary/${prefix}`)
      this.images = images.resources.map(img => ({ ...img, selected: false }))
    }
  }
}
