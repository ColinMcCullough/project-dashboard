export default {
  data() {
    return {
      url: null,
      response: null,
      error: null
    }
  },
  methods: {
    discover(projectId) {
      try {
        // await this.$axios.$post(`api/v1/jobs/link-discoverer/${projectId}`)
      } catch (err) {
        this.error = err
      }
    }
  }
}
