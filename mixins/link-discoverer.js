export default {
  data() {
    return {
      url: null,
      response: null,
      error: null
    }
  },
  methods: {
    async discover(url, target) {
      try {
        this[target] = await this.$axios.$post('api/v1/discover', { url })
      } catch (err) {
        this.error = err
      }
    }
  }
}
