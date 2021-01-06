<template>
  <div>
    <b-card text-variant="white" bg-variant="primary" class="px-5">
      <b-card-title class="font-weight-bold">
        Urls
      </b-card-title>
      <b-row>
        <b-col>
          <b-input-group prepend="Homepage Url" class="mb-2">
            <!-- needs input handler -->
            <b-form-input
              :value="location.properties.current_website"
              :state="validURL(location.properties.current_website)"
              aria-label="Homepage Url"
              placeholder="ex: https://www.m2apartments.com"
            />
            <b-form-invalid-feedback :state="validURL(location.properties.current_website)" class="pt-1 pl-2 abs-feedback" style="top: 14px;">
              Invalid Url
            </b-form-invalid-feedback>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-textarea
            id="bulk-urls"
            :value="pagesToString"
            :state="validatePages()"
            placeholder="Paste a list of all urls to be scraped"
            rows="4"
            class="text-left better-input py-2"
            required
            @input="updatePages($event, 'pages')"
          />
          <b-form-invalid-feedback :state="validatePages()" class="pt-1 abs-feedback" style="top: 14px;">
            Invalid Url/s
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
    </b-card>
    <b-card text-variant="white" class="scrapers-card px-5">
      <b-card-title class="font-weight-bold">
        Scrapers
      </b-card-title>
      <b-form-checkbox :checked="location.enableAll" name="check-button" switch @input="updateScrapers($event)">
        {{ scraperLabel }}
      </b-form-checkbox>
      <b-row class="mt-2">
        <b-col
          v-for="(val, key, index) in location.scrapers"
          :key="`${key}-${index}`"
        >
          <b-form-checkbox
            :checked="val"
            :name="`check-button-${index}`"
            switch
            @change="updateScraper({
              locIdx,
              key,
              val: !val
            })"
          >
            {{ titleCase(key) }}
          </b-form-checkbox>
        </b-col>
      </b-row>
    </b-card>
    <b-card text-variant="white" class="selectors-card px-5">
      <b-card-title class="font-weight-bold">
        Selectors
      </b-card-title>
      <b-row class="mt-2">
        <b-col class="d-flex justify-content-between">
          <b-form-group
            v-for="(val, key, index) in location.template"
            :key="`${key}-${index}`"
            :description="`Ex: #${key}-block`"
            :label="key === 'slug' ? `Amenities ${titleCase(key)}` : titleCase(key)"
            class="mb-2 mr-3"
          >
            <b-form-input
              :value="val"
              :placeholder="`Enter Html Selector`"
              @input="updateTemplate({
                locIdx,
                key,
                val: $event
              })"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import Locations from '~/mixins/locations'
import GlobalFunctions from '~/mixins/global-functions'
export default {
  mixins: [GlobalFunctions, Locations],
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      enableAll: false,
      regex: /[ ,\n]+/
    }
  },
  computed: {
    pagesToString() {
      return Array.isArray(this.pages)
        ? this.pages.join('\n')
        : ''
    },
    locIdx() {
      return this.getLocationIndex(this.id)
    },
    location() {
      return this.locationById(this.id)
    },
    scraperLabel() {
      return this.location.enableAll
        ? 'Disable All Scrapers' : 'Enable All Scrapers'
    },
    pages() {
      return this.location.pages
    },
    stepComplete() {
      return this.validatePages() &&
        this.validURL(this.location.curr)
    }
  },
  created() {
    const val = this.validatePages() &&
      this.validURL(this.location.properties.current_website)
    this.updateLocation({ locIdx: this.locIdx, key: 'validUrls', val })
  },
  methods: {
    updatePages(val, key) {
      const arr = val.split(this.regex).filter(val => val)
      this.updateLocation({ locIdx: this.locIdx, key: 'pages', val: arr })
    },
    onInput(val, key) {
      this.updateLocationProp({ locIdx: this.locIdx, key, val })
    },
    updateScrapers(evt) {
      this.updateLocation({
        locIdx: this.locIdx,
        key: 'enableAll',
        val: !this.location.enableAll
      })
      Object.keys(this.location.scrapers).forEach((key) => {
        this.updateScraper({ locIdx: this.locIdx, key, val: this.location.enableAll })
      })
    },
    validatePages() {
      return this.pages.length > 0
        ? this.pages.every(url => this.validURL(url))
        : false
    },
    validProtocol() {
      return this.rootProtocol === 'http' || this.rootProtocol === 'https'
    }
  }
}
</script>

<style lang="scss" scoped>
.scrapers-card {
  background: linear-gradient(var(--primary), var(--secondary))
}
.selectors-card {
  background: linear-gradient(var(--secondary), var(--success-0))
}
.card {
  border: none;
}
.main {
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0px;
}
.scroll-container {
  overflow-y: scroll;
  height: 100%;
  scroll-behavior: smooth;
}
.abs-feedback {
  position: absolute;
  top: 14px;
  right: 0;
  transform: translateY(-50%);
  max-width: 25%;
  text-align: center;
  font-weight: 700;
  z-index: 9999;
}
.form-control {
  min-width: 250px
}
// .rounded-pill {
//   border-radius: 50rem !important;
// }
</style>
