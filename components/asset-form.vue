<template>
  <div>
    <b-card text-variant="white" bg-variant="primary" class="px-5">
      <b-card-title class="font-weight-bold">
        Urls
      </b-card-title>
      <b-row>
        <b-col>
          <b-input-group prepend="Homepage Url" class="mb-2">
            <b-form-input
              :value="location.properties.url"
              :state="validURL(location.properties.url)"
              aria-label="Homepage Url"
              placeholder="ex: https://www.m2apartments.com"
              @input="onInput($event, 'url')"
            />
            <b-form-invalid-feedback :state="validURL(location.properties.url)" class="pt-1 pl-2 abs-feedback" style="top: 14px;">
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
      <b-form-checkbox v-model="enableAll" name="check-button" switch @input="updateScrapers($event)">
        {{ enableDisableTxt }}
      </b-form-checkbox>
      <b-row class="mt-2">
        <b-col
          v-for="(scraper, index) in scrapers"
          :key="`${scraper}-${index}`"
        >
          <b-form-checkbox v-model="scraper.checked" name="check-button" switch>
            {{ scraper.text }}
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
            v-for="(type, index) in Object.keys(template)"
            :key="`${type}-${index}`"
            :description="`Ex: ${template[type].example}`"
            :label="titleCase(type)"
            class="mb-2 mr-3"
          >
            <b-form-input
              v-model="template[type].selector"
              :placeholder="`Enter Html Selector`"
            />
          </b-form-group>
          <b-form-group
            label="Amenities Slug"
            class="mb-2"
            description="Ex: features-amenities"
          >
            <b-form-input
              v-model="template.amenities.slug"
              placeholder="Enter Amenities Page Slug"
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
      locationId: null,
      enableAll: false,
      regex: /[ ,\n]+/,
      topicName: 'assetScraper_1',
      selected: [],
      scrapers: [
        { text: 'Photos', value: 'photos', checked: false },
        { text: 'Amenities', value: 'amenities', checked: false },
        { text: 'Address', value: 'address', checked: false },
        { text: 'Emails', value: 'emails', checked: false },
        { text: 'Phone Number', value: 'phoneNumber', checked: false }
      ],
      template: {
        address: {
          selector: '',
          example: '#address-block'
        },
        phone: {
          selector: '',
          example: '#phone-block'
        },
        email: {
          selector: '',
          example: '#address-block'
        },
        amenities: {
          selector: '',
          example: '.row .wp-block-columns',
          slug: ''
        }
      }
    }
  },
  computed: {
    pagesToString() {
      return Array.isArray(this.pages)
        ? this.pages.join('\n')
        : ''
    },
    location() {
      return this.locationById(this.id)
    },
    enableDisableTxt() {
      return this.enableAll ? 'Disable All Scrapers' : 'Enable All Scrapers'
    },
    pages() {
      return this.location.pages
    },
    stepComplete() {
      return this.validatePages() && this.validURL(this.location.properties.url)
    }
  },
  watch: {
    stepComplete(val) {
      const locIdx = this.getLocationIndex(this.id)
      this.updateLocation({ locIdx, key: 'validUrls', val })
    }
  },
  methods: {
    updatePages(val, key) {
      const arr = val.split(this.regex).filter(val => val)
      const locIdx = this.getLocationIndex(this.id)
      this.updateLocation({ locIdx, key: 'pages', val: arr })
    },
    onInput(val, key) {
      const locIdx = this.getLocationIndex(this.id)
      this.updateLocationProp({ locIdx, key, val })
    },
    updateScrapers(evt) {
      // eslint-disable-next-line no-return-assign
      this.scrapers.forEach(scraper => scraper.checked = evt)
    },
    valid(val) {
      return !val
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
