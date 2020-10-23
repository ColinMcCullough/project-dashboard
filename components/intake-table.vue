<template>
  <b-card
    header-class="d-flex flex-wrap justify-content-between align-items-center"
    footer-tag="footer"
    no-body
    border-variant="success-1"
  >
    <b-table
      id="intakeTbl"
      ref="intakeTbl"
      :items="intakeData"
      :fields="fields"
      :sort-compare="sortCompare"
      primary-key="key"
      striped
      responsive
      head-variant="dark"
      class="mb-0"
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
        <icons-swap
          :needsCheckIcon="validUrl(data.item.url)"
          :iconConfig="iconConfig"
        />
      </template>
    </b-table>
    <template #footer>
      <b-btn class="float-right" variant="success-1" @click="onSave">
        Save Urls
      </b-btn>
    </template>
  </b-card>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      intakeData: [
        { locationName: 'Complex 1', url: 'http://www.getg5.com', key: 1 },
        { locationName: 'Complex 2', url: 'http://www.getg5.com', key: 2 },
        { locationName: 'Complex 3', url: 'http://www.getg5.com', key: 3 },
        { locationName: 'Complex 4', url: 'http://www.getg5.com', key: 4 }
      ],
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
    onInput(val, key) {
      const index = this.intakeData.findIndex(data => data.key === key)
      if (index !== -1) {
        this.intakeData[index].url = val
      }
    },
    onSave() {
      // need to save intakeData to the database
    },
    sortCompare(aRow, bRow, key, sortDesc) {
      let a, b
      if (key === 'url' || key === 'locationName') {
        a = aRow[key] // or use Lodash `_.get()`
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
