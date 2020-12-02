<template>
  <div>
    <b-table
      ref="locationListTbl"
      :fields="['location', { key: 'name', tdClass: 'd-none' }]"
      :items="locations"
      select-mode="single"
      selectable
      sticky-header
      borderless
      style="max-height: 75vh;"
      class="p-0 m-0 border-0 hide"
      @row-selected="onLocationSelect"
    >
      <template v-slot:cell(location)="{ item }">
        <div class="px-3">
          <tab-title :title="item.properties.name" />
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import Locations from '~/mixins/locations'
export default {
  mixins: [Locations],
  data () {
    return {
      filter: ''
    }
  },
  computed: {},
  mounted() {
    const selectedLocationId = this.$store.state.locations.selectedLocation.locationId
    const selectedLocationTableIndex = this.$refs.locationListTbl.items
      .findIndex(item => item.locationId === selectedLocationId)
    this.$refs.locationListTbl.selectRow(selectedLocationTableIndex)
  },
  methods: {
    onLocationSelect (selectedLocation) {
      console.log(selectedLocation)
      const location = selectedLocation[0]
      this.updateSelectedLocations({ selectedLocation: location })
    }
  }
}
</script>

<style lang="scss">
.hide thead[role=rowgroup] {
  display: none;
}
.table.b-table > tbody > .table-active,
.table.b-table > tbody > .table-active > th,
.table.b-table > tbody > .table-active > td {
  background-color: #4e6f96 !important;
  box-shadow: inset 10px 0 0 0 #6889b0 !important;
}
</style>
