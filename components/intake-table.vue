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
      <template v-slot:cell(valid)="data">
        <icons-swap v-bind="{ needsCheckIcon: validUrl(data.item.properties.url), iconConfig }" />
      </template>
    </b-table>
    <template v-slot:footer>
      <b-btn variant="success-1" :disabled="disabledBtn" pill @click="onSave">
        <b-icon-check2-circle />
        Save Urls
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
    disabledBtn() {
      return this.locations
        .some(location => !this.validUrl(location.properties.url))
    }
  },
  watch: {
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
    onSave() {
      // need to save intakeData to the database
      // waiting on route to be written
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
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  max-width: 25%;
  text-align: center;
  font-weight: 700;
  // z-index: 9999;
}

</style>
