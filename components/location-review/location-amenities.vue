<template>
  <b-container fluid class="p-2">
    <b-row
      v-for="(amenity, index) in amenities"
      :key="`${amenity}-${index}`"
      class="mb-2"
    >
      <b-col>
        <b-input-group prepend="Type">
          <b-form-select
            :value="amenity.type"
            :options="types"
            @input="amenity.type = $event"
          />
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group>
          <b-form-input
            :value="amenity.value"
            @input="($event) => { amenity.value = $event }"
          />
          <template v-slot:append>
            <b-btn
              variant="tertiary-1"
              @click="amenities.splice(index, 1)"
            >
              <b-icon-trash-fill />
            </b-btn>
          </template>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-btn
          variant="outline-success-0"
          pill
          @click="amenities.push({ type: null, amenity: '' })"
        >
          <b-icon-plus-square-fill />
          Add
        </b-btn>
      </b-col>
    </b-row>
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
    id() {
      return this.selectedLocation.locationId
    },
    amenities() {
      return this.selectedLocation.properties.amenities
    }
  }
}
</script>

<style>

</style>
