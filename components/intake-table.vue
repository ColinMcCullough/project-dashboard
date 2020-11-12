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
      :items="intakeData"
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
      <template v-slot:cell(url)="data">
        <b-form-group class="mb-0" style="position: relative;">
          <b-form-input
            id="bulk-urls"
            :state="validUrl(data.value)"
            :value="data.value"
            placeholder="Paste your url"
            class="text-left"
            required
            @input="onInput($event, data.item.key)"
          />
          <b-form-invalid-feedback
            :state="validUrl(data.value)"
            class="m-0 abs-feedback"
          >
            Invalid Url
          </b-form-invalid-feedback>
        </b-form-group>
      </template>
      <template v-slot:cell(valid)="data">
        <icons-swap v-bind="{ needsCheckIcon: validUrl(data.item.url), iconConfig }" />
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
export default {
  components: {
  },
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data () {
    return {
      intakeData: [],
      // intakeData: [
      //   { locationName: 'Complex 1', url: 'http://www.getg5.com', key: 1 },
      //   { locationName: 'Complex 2', url: 'http://www.getg5.com', key: 2 },
      //   { locationName: 'Complex 3', url: 'http://www.getg5.com', key: 3 },
      //   { locationName: 'Complex 4', url: 'http://www.getg5.com', key: 4 }
      // ],
      fields: [
        {
          key: 'valid',
          label: 'Valid URL',
          sortable: true
        },
        {
          key: 'locationName',
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
      return this.intakeData.some(location => !this.validUrl(location.url))
    }
  },
  watch: {
  },
  async mounted() {
    // need to update project id
    const locations = await this.$axios
      .$get('/api/v1/projects/1234567890/locations')
    this.intakeData = locations.map((location) => {
      return {
        key: location.locationId,
        url: location.url,
        locationName: location.name
      }
    })
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
    onInput(val, key) {
      const index = this.intakeData.findIndex(data => data.key === key)
      if (index !== -1) {
        this.intakeData[index].url = val
      }
    },
    onSave() {
      // need to save intakeData to the database
      // waiting on route to be written
    },
    sortCompare(aRow, bRow, key, sortDesc) {
      let a, b
      if (key === 'url' || key === 'locationName') {
        a = aRow[key]
        b = bRow[key]
      } else if (key === 'valid') {
        a = this.validUrl(aRow.url)
        b = this.validUrl(bRow.url)
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
