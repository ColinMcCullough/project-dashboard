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
    async deleteImg(id) {
      const msg = await this.$axios.$post('api/v1/image', { id })
      this.$emit('delete-response', msg)
    },
    getUrl(path) {
      return this.$cloudinary.image.url(
        path,
        {
          width: '200',
          height: 200,
          crop: 'fill'
        }
      )
    },
    async getImagesByFolder(prefix) {
      const images = await this.$axios.$get(`api/v1/images/${prefix}`)
      this.images = images.resources
    }
  }
}
