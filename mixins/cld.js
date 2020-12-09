export default {
  data () {
    return {
      isLoading: false,
      images: []
    }
  },
  methods: {
    async deleteImg (id) {
      const msg = await this.$axios.$post('api/v1/cloudinary', { id })
      this.images.splice(this.images.findIndex(img => img.public_id === id), 1)
      this.$emit('delete-res', msg)
      this.toggleSelected(id)
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
      try {
        this.isLoading = true
        const images = await this.$axios.$get(`api/v1/cloudinary?prefix=${prefix}`)
        this.images = images.resources.map(img => ({ ...img, selected: false }))
      } catch (e) {
        this.images = []
      } finally {
        this.isLoading = false
      }
    }
  }
}
