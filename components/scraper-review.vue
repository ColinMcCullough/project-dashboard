<template>
  <b-card
    no-body
    border-variant="success-1"
    style="position: absolute; bottom: 10px; top: 10px; left: 10px; right: 10px; overflow: scroll;"
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
      <b-col class="text-right">
        <span :id="runTip" class="d-inline-block">
          <b-button size="lg" variant="primary" :disabled="disabledScraper" class="mx-3" @click="runScraper">
            Enqueue Asset Scraper
          </b-button>
          <b-tooltip target="run-tip" placement="left" variant="quaternary">
            complete required fields to run
          </b-tooltip>
        </span>
      </b-col>
    </b-row>
    <b-row v-if="alertTxt !== ''">
      <b-col class="text-right h5">
        {{ alertTxt }}
        <b-icon-check variant="success" />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import Locations from '~/mixins/locations'
import GlobalFunctions from '~/mixins/global-functions'
export default {
  components: {
  },
  mixins: [Locations, GlobalFunctions],
  props: {},
  data() {
    return {
      alertTxt: ''
    }
  },
  computed: {
    runTip() {
      return this.disabledScraper ? 'run-tip' : 'no-tip'
    },
    disabledScraper() {
      const disabled = this.locations.some((location) => {
        return !this.validURL(location.properties.url) ||
          this.validUrls(location.properties.urls)
      })
      return disabled
    }
  },
  methods: {
    validUrls(urls) {
      return urls.some(url => !this.validURL(url))
    },
    async runScraper() {
      this.alertTxt = 'Job Enqueued!'
      const body = this.getBody()
      await this.$axios.$post(`/api/v1/jobs/asset-scraper:${this.projectId}`, body)
      setTimeout(() => { this.alertTxt = '' }, 10000)
    },
    getBody() {
      const url = new URL(this.url)
      const scrapers = this.scrapers.reduce((acc, curr) => {
        return Object.assign(acc, { [curr.value]: curr.checked })
      }, {})
      const body = {
        locationId: this.locationId,
        rootProtocol: url.protocol.replace(':', ''),
        rootdomain: url.host,
        pages: this.getUrls(),
        scrapers,
        template: this.template
      }
      return body
    }
  }
}
</script>

<style lang="scss">
.ov-x-hidden {
  overflow-x: hidden;
}
.nav-tabs {
  overflow: hidden;
  border-bottom: none !important;
  border-radius: 0 0 10px 0;
}
.nav-tabs .nav-link {
  color: inherit;
  background-color: #cbd8e1;
  border-radius: 10px 10px 0 0!important;
  border-bottom: none;
}

.nav-tabs .nav-item {
  margin-right: 5px;
}
</style>
