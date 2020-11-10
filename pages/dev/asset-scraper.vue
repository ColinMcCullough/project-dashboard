<template>
  <div fluid style="max-width: 1400px;">
    <top-nav>
      <b-btn
        variant="outline-success-0"
        pill
        to="/dev/dashboard"
        class="mr-2"
      >
        Dev
      </b-btn>
      <b-btn
        variant="outline-success-0"
        pill
        to="/queues"
        class="mr-2"
      >
        Queues and Jobs
      </b-btn>
      <b-btn
        variant="outline-success-0"
        pill
        to="/asset-scraper"
      >
        Asset Scraper
      </b-btn>
    </top-nav>
    <div class="main">
      <b-container fluid class="scroll-container">
        <b-row>
          <b-col>
            <h3 class="m-3 font-weight-bold">
              Run Asset Scraper
            </h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card bg-variant="dark" text-variant="white">
              <b-card-title class="font-weight-bold">
                Location
              </b-card-title>
              <b-row>
                <b-col>
                  <b-input-group
                    prepend="Location Id"
                    type="number"
                    class="mb-0"
                  >
                    <b-form-input
                      v-model="locationId"
                      :state="valid(!locationId)"
                      placeholder="Enter Location ID in Database"
                    />
                    <b-form-invalid-feedback :state="valid(url)" class="abs-feedback" style="top: 14px;">
                      Missing Id
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-card>
            <b-card class="bg-primary" text-variant="white">
              <b-card-title class="font-weight-bold">
                Urls
              </b-card-title>
              <b-row>
                <b-col>
                  <b-input-group prepend="Homepage Url" class="mb-2">
                    <b-form-input
                      v-model="url"
                      :state="validURL(url)"
                      aria-label="Homepage Url"
                      placeholder="ex: https://www.m2apartments.com"
                    />
                    <b-form-invalid-feedback :state="validURL(url)" class="pt-1 pl-2 abs-feedback" style="top: 14px;">
                      Invalid Url
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-textarea
                    id="bulk-urls"
                    v-model="urls"
                    :state="validateUrls()"
                    placeholder="Paste a list of all urls to be scraped"
                    rows="4"
                    class="text-left better-input py-2"
                    required
                  />
                  <b-form-invalid-feedback :state="validateUrls()" class="pt-1 abs-feedback" style="top: 14px;">
                    Invalid Url/s
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
            </b-card>
            <b-card class="bg-secondary" text-variant="white">
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
            <b-card class="bg-success-0" text-variant="white">
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
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <b-button size="lg" variant="outline-primary" :disabled="disabledScraper" class="my-3" @click="runScraper">
              Enqueue Asset Scraper
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locationId: null,
      enableAll: false,
      regex: /[ ,\n]+/,
      topicName: 'assetScraper_1',
      url: '',
      urls: '',
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
    enableDisableTxt() {
      return this.enableAll ? 'Disable All Scrapers' : 'Enable All Scrapers'
    },
    disabledScraper() {
      let disabled = true
      const urls = this.getUrls()
      if (urls.length > 0) {
        const values = [this.locationId, this.url, ...urls]
        disabled = !values.every(value => value)
      }
      return disabled
    }
  },
  methods: {
    async runScraper() {
      const body = this.getBody()
      await this.$axios.$post('/api/v1/jobs/asset-scraper', body)
    },
    getBody() {
      const url = new URL(this.url)
      const scrapers = this.scrapers.reduce(function (acc, curr) {
        return Object.assign(acc, { [curr.value]: curr.checked })
      }, {})
      const body = {
        rootProtocol: url.protocol.replace(':', ''),
        rootdomain: url.host,
        pages: this.getUrls(),
        scrapers,
        template: this.template
      }
      return body
    },
    updateScrapers(evt) {
      // eslint-disable-next-line no-return-assign
      this.scrapers.forEach(scraper => scraper.checked = evt)
    },
    valid(val) {
      return !val
    },
    titleCase(str) {
      return str.replace(/_/g, ' ').toLowerCase().split(' ').map((word) => {
        return (`${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      }).join(' ')
    },
    getUrls() {
      return this.urls.split(this.regex).filter(val => val)
    },
    validateUrls() {
      const urls = this.getUrls()
      return urls.length > 0
        ? urls.every(url => this.validURL(url))
        : false
    },
    validURL(string) {
      let url
      try {
        url = new URL(string)
      } catch (err) {
        return false
      }
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(string) && (url.protocol === 'http:' || url.protocol === 'https:')
    },
    validProtocol() {
      return this.rootProtocol === 'http' || this.rootProtocol === 'https'
    }
  }
}
</script>

<style lang="scss" scoped>
// .is-invalid {
//   border-width: 2px;
// }
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
</style>
