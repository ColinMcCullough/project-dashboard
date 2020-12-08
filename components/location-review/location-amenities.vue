<template>
  <b-container fluid class="p-2">
    <div v-for="(list, index) in toDoLists" :key="`${list.listName}-${index}`">
      <to-do v-bind="{ toDoProps: list }" />
    </div>
  </b-container>
</template>

<script>
import Locations from '~/mixins/locations'
export default {
  mixins: [Locations],
  data () {
    return {
      types: [
        { value: null, text: 'Select Type' },
        { value: 'apartmentAmenity', text: 'Apartment Amenity' },
        { value: 'communityAmenity', text: 'Community Amenity' }
      ]
    }
  },
  computed: {
    toDoLists() {
      let lists = []
      if (this.selectedLocation) {
        const arr = [
          {
            list: this.selectedLocation.properties.amenities,
            label: 'Amenity Type',
            propName: 'amenities',
            options: this.types,
            isArrObjects: true,
            verticals: ['mf', 'sl']
          },
          {
            list: this.selectedLocation.properties.careLevels,
            label: 'Care Levels',
            propName: 'careLevels',
            options: null,
            isArrObjects: false,
            verticals: ['sl']
          },
          {
            list: this.selectedLocation.properties.features,
            label: 'Features',
            propName: 'features',
            options: null,
            isArrObjects: false,
            verticals: ['ss']
          }
        ]
        lists = arr.filter(list => list.verticals.includes(this.vertical))
      }
      return lists
    },
    vertical () {
      return this.selectedLocation.properties.vertical
    }

  },
  methods: {
    onUpdate(val, key, index) {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      this.$store.dispatch('locations/updateAmenity',
        { locIdx, index, key, val }
      )
      this.updateLocation({ locIdx, key: 'edited', val: true })
    },
    onAdd () {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      this.$store.dispatch('locations/addAmenity', { locIdx: this.locIdx })
      this.updateLocation({ locIdx, key: 'edited', val: true })
    },
    onDelete (index) {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      this.$store.dispatch('locations/deleteAmenity', { locIdx, index })
      this.updateLocation({ locIdx, key: 'edited', val: true })
    }
  }
}
</script>

<style>

</style>
