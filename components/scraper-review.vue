<template>
  <b-card
    no-body
    border-variant="gray-60"
    style="position: absolute; bottom: 10px; top: 10px; left: 10px; right: 10px;"
  >
    <b-tabs pills card>
      <b-tab
        v-for="(location, i) in locations"
        :key="`${location.locationId}-${i}`"
      >
        <template v-slot:title>
          {{ location.properties.name }}
        </template>
        <asset-form :id="locations[i].locationId" />
      </b-tab>
    </b-tabs>
    <b-row>
      <b-col class="text-right mr-4">
        <span :id="runTip" class="d-inline-block">
          <b-button size="lg" variant="primary" :disabled="disabledScraper" class="mx-3" @click="runScraper">
            <b-icon-arrow-clockwise v-if="enqueing" animation="spin" />
            {{ enqueing ? 'Job Enqueued!' : 'Enqueue Scraper' }}
          </b-button>
          <b-tooltip target="run-tip" placement="left" variant="quaternary">
            all locations must have a valid url and pages
          </b-tooltip>
        </span>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import Locations from '~/mixins/locations'
import GlobalFunctions from '~/mixins/global-functions'
export default {
  mixins: [Locations, GlobalFunctions],
  data() {
    return {
      enqueing: false
    }
  },
  computed: {
    runTip() {
      return this.disabledScraper ? 'run-tip' : 'no-tip'
    },
    disabledScraper() {
      return this.locations.some(location => !location.validUrls)
    }
  },
  methods: {
    validUrls(urls) {
      return urls.some(url => !this.validURL(url))
    },
    async runScraper() {
      this.enqueing = true
      const body = this.getBody()
      await this.$axios.$post(`/api/v1/jobs/asset-scraper/${this.projectId}`, body)
      setTimeout(() => {
        this.enqueing = false
      }, 5000)
    },
    formatTemplate(template) {
      return {
        address: { selector: template.address },
        phone: { selector: template.phone },
        email: { selector: template.email },
        amenities: { selector: template.amenities, slug: template.slug }
      }
    },
    getBody() {
      const payload = []
      this.locations.forEach((location) => {
        const url = new URL(location.properties.current_website)
        payload.push({
          locationId: location.locationId,
          rootProtocol: url.protocol.replace(':', ''),
          rootdomain: url.host,
          pages: location.pages,
          scrapers: location.scrapers,
          template: this.formatTemplate(location.template)
        })
      })
      return payload
    }
  }
}
</script>

<style lang="scss">
.ov-x-hidden {
  overflow-x: hidden;
}
// .nav-tabs {
//   overflow: hidden;
//   border-bottom: none !important;
//   border-radius: 0 0 10px 0;
// }
// .nav-tabs .nav-link {
//   color: inherit;
//   background-color: #cbd8e1;
//   border-radius: 10px 10px 0 0 !important;
//   border-bottom: none;
// }

// .nav-tabs .nav-item {
//   margin-right: 5px;
// }
</style>
