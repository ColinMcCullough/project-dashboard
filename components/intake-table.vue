<template>
  <b-card
    footer-class="d-flex justify-content-end border-0"
    footer-bg-variant="white"
    no-body
    class="border-0"
  >
    <b-table
      id="intakeTbl"
      ref="intakeTbl"
      :items="locations"
      :fields="fields"
      :sort-compare="sortCompare"
      primary-key="key"
      striped
      outlined
      responsive
      head-variant="light"
      class="mb-0 rounded-table"
    >
      <template v-slot:head(url)="data">
        {{ data.label.toUpperCase() }}
      </template>
      <template v-slot:cell(name)="data">
        {{ data.item.properties.name }}
      </template>
      <template v-slot:cell(url)="data">
        <b-form-group class="mb-0" style="position: relative;">
          <b-form-input
            :state="validUrl(data.item.properties.url)"
            :value="data.item.properties.url"
            placeholder="Paste your url"
            class="text-left"
            required
            @input="onInput($event, data.item.locationId, data.field.key)"
          />
          <b-form-invalid-feedback
            :state="validUrl(data.item.properties.url)"
            class="m-0 abs-feedback"
          >
            Invalid Url
          </b-form-invalid-feedback>
        </b-form-group>
      </template>
      <template v-slot:cell(vendor)="data">
        <b-form-group class="mb-0" style="position: relative;">
          <b-form-input
            :value="data.item.properties.vendor"
            placeholder="Location Vendor"
            class="text-left"
            required
            @input="onInput($event, data.item.locationId, data.field.key)"
          />
        </b-form-group>
      </template>
      <template v-slot:cell(valid)="data">
        <icons-swap v-bind="{ needsCheckIcon: validUrl(data.item.properties.url), iconConfig }" />
      </template>
      <template v-slot:cell(corporate)="data">
        <b-form-checkbox
          :checked="data.item.properties.corporate"
          button-variant="secondary"
          name="check-switch"
          size="lg"
          switch
          @input="onInput($event, data.item.locationId, data.field.key)"
        />
      </template>
      <template v-slot:cell(singleDomain)="data">
        <b-form-checkbox
          :checked="data.item.properties.singleDomain"
          button-variant="secondary"
          name="check-switch"
          size="lg"
          switch
          @input="onInput($event, data.item.locationId, data.field.key)"
        />
      </template>
    </b-table>
    <template v-slot:footer>
      <b-badge v-if="multipleCorpSelected" variant="error" class="px-3 rounded">
        <b-icon-exclamation-triangle-fill />
        Multiple Corporate Locations Selected.
      </b-badge>
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
  </b-card>
</template>

<script>
import Locations from '~/mixins/locations'
export default {
  components: {},
  mixins: [Locations],
  data () {
    return {
      isSaving: false,
      fields: [
        {
          key: 'valid',
          label: 'Valid URL',
          sortable: true
        },
        {
          key: 'name',
          label: 'Location',
          sortable: true
        },
        {
          key: 'url',
          label: 'URL',
          sortable: true
        },
        {
          key: 'vendor',
          label: 'Vendor',
          sortable: true
        },
        {
          key: 'corporate',
          label: 'Corporate?',
          sortable: true
        },
        {
          key: 'singleDomain',
          label: 'Single Domain?',
          sortable: true
        }
      ],
      iconConfig: {
        width: '25',
        height: '25',
        true: '/green-check.svg',
        false: '/red-x.svg'
      }
    }
  },
  computed: {
    multipleCorpSelected() {
      let count = 0
      let val = false
      for (let i = 0; i < this.locations.length; i++) {
        if (count > 1) {
          val = true
          break
        } else if (this.locations[i].properties.corporate === true) {
          count++
        }
      }
      return val
    },
    disabledBtn() {
      return this.locations
        .some(location => !this.validUrl(location.properties.url))
    }
  },
  methods: {
    validUrl(str) {
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(str)
    },
    onInput(val, locationId, key) {
      const locIdx = this.getLocationIndex(locationId)
      this.onUpdate({ locIdx, key, val })
    },
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
      // setTimeout(() => { this.isSaving = false }, 3500)
    },
    sortCompare(aRow, bRow, key, sortDesc) {
      let a, b
      if (key === 'url' || key === 'name') {
        a = aRow.properties[key]
        b = bRow.properties[key]
      } else if (key === 'valid') {
        a = this.validUrl(aRow.properties.url)
        b = this.validUrl(bRow.properties.url)
      }
      return a < b ? -1 : a > b ? 1 : 0
    }
  }
}
</script>

<style lang="scss">
.rounded-table {
  border-radius: 15px;
  overflow: hidden;
}
.table {
  & td {
    vertical-align: middle;
    padding: .45rem .5rem !important;
  }
}
.abs-feedback {
  position: absolute !important;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  max-width: 35%;
  text-align: center;
  font-weight: 700;
  // z-index: 9999;
}

</style>
