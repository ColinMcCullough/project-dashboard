<template>
  <b-card
    header-class="d-flex flex-wrap justify-content-between align-items-center px-0 py-1 border-0"
    no-body
    border-variant="success-0"
  >
    <b-table
      id="intakeTbl"
      ref="intakeTbl"
      :items="intakeData"
      :fields="fields"
      primary-key="key"
      striped
      responsive
      head-variant="light"
    >
      <template v-slot:head(url)="data">
        {{ data.label.toUpperCase() }}
      </template>
      <template v-slot:cell(url)="data">
        <b-form>
          <b-input
            id="bulk-urls"
            :state="validUrl(data.value)"
            :value="data.value"
            placeholder="Paste your url"
            class="text-left"
            required
            @input="onInput($event, data.item.key)"
          />
          <b-form-invalid-feedback :state="validUrl(data.value)" class="pt-1">
            Invalid Url
          </b-form-invalid-feedback>
        </b-form>
      </template>
      <template v-slot:cell(valid)="data">
        <icons-swap
          :needsCheckIcon="validUrl(data.item.url)"
          :iconConfig="iconConfig"
        />
      </template>
    </b-table>
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
          key: 'locationName',
          label: 'Location'
        },
        {
          key: 'url',
          label: 'URL',
          sortable: true
        },
        {
          key: 'valid',
          label: 'Valid Url',
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
      console.log(!!pattern.test(str))
      return !!pattern.test(str)
    },
    onInput(val, key) {
      const index = this.intakeData.findIndex(data => data.key === key)
      if (index !== -1) {
        this.intakeData[index].url = val
      }
    }
  }
}
</script>

<style lang="scss">
#intakeTbl .table-active,
.table.b-table > tbody > .table-active > th,
.table.b-table > tbody > .table-active > td {
  background-color: white;
}
</style>
