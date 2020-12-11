<template>
  <b-btn
    :disabled="disabledBtn"
    variant="outline-secondary"
    pill
    style="min-width: 120px;"
    @click="onSave"
  >
    <b-icon-check-circle :animation="isSaving ? 'throb' : ''" />
    {{ isSaving ? 'Saving...' : 'Save and Start Crawl' }}
  </b-btn>
</template>

<script>
import GlobalFunctions from '~/mixins/global-functions'
import Locations from '~/mixins/locations'
export default {
  components: {},
  mixins: [Locations, GlobalFunctions],
  data () {
    return {
      isSaving: false
    }
  },
  computed: {
    disabledBtn() {
      return this.locations
        .some(location => !this.validURL(location.properties.url))
    }
  },
  methods: {
    async onSave () {
      this.isSaving = true
      const locations = this.locations.map((location) => {
        return {
          locationId: location.locationId,
          properties: {
            url: location.properties.url,
            corporate: location.properties.corporate,
            vendor: location.properties.vendor,
            singleDomain: location.properties.singleDomain
          }
        }
      })
      await this.saveLocations(this.projectId, locations)
      this.$store.dispatch('projects/update', this.projectId)
      this.isSaving = false
    }
  }
}
</script>

<style lang="scss">

</style>
