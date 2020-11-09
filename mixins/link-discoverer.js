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
        this[target] = await this.$axios.$post('api/v1/link-discoverer', { url })
      } catch (err) {
        this.error = err
      }
    }
  }
}
