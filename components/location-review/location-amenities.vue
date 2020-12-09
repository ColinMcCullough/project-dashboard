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
            placeholder: 'ex. Swimming Pool',
            options: this.types,
            isArrObjects: true,
            maxItems: 20,
            verticals: ['mf', 'sl']
          },
          {
            list: this.selectedLocation.properties.careLevels,
            label: 'Care Level',
            propName: 'careLevels',
            placeholder: 'ex. Memory Care',
            options: null,
            isArrObjects: false,
            maxItems: 15,
            verticals: ['sl']
          },
          {
            list: this.selectedLocation.properties.features,
            label: 'Feature',
            propName: 'features',
            placeholder: 'ex. RV Storage',
            options: null,
            isArrObjects: false,
            maxItems: 15,
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
  }
}
</script>

<style>

</style>
