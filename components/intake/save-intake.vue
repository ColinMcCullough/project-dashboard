<template>
  <div>
    <b-row class="p-3">
      <div class="px-2 d-flex justify-content-between">
        <b-button class="rounded" variant="secondary" @click="$emit('previous-step')">
          <b-icon-arrow-left-circle />
          Previous
        </b-button>
      </div>
    </b-row>
    <b-row class="px-3">
      <div class="px-2 pb-3">
        <span class="text-uppercase font-weight-bold text-gray-60">
          Thanks for all that information! We’re going to use it to do the following:
        </span>
        <ol type="number">
          <li>Crawl - We will find all the pages of the sites you specified.</li>
          <li>Scrape - We will scrape all the pages we find for relevant information.</li>
        </ol>
        <span class="font-italic">*Check back in shortly to review the information we found in our scrape.</span>
      </div>
    </b-row>
    <b-row class="px-3">
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
    </b-row>
  </div>
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
