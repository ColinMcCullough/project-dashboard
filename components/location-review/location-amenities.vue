<template>
  <b-container fluid class="p-2">
    <b-row
      v-for="(amenity, index) in amenities"
      :key="`${amenity}-${index}`"
      class="mb-2"
      no-gutters
    >
      <b-col>
<<<<<<< HEAD
        <b-input-group prepend="Type">
          <b-form-select
            :value="amenity.type"
            :options="types"
            @input="amenity.type = $event"
=======
        <b-input-group>
          <b-input-group-prepend class="d-flex align-items-center px-3 font-weight-bold text-uppercase text-secondary-60">
            Amenity Type
          </b-input-group-prepend>
          <b-form-select
            :value="amenity.type"
>>>>>>> de6ee5519dcd05bbf97714b1e0df9bfe4ece0ed5
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
<<<<<<< HEAD
              variant="tertiary-1"
              @click="amenities.splice(index, 1)"
=======
              variant="error-20"
              pill
              @click="onDrop(amenity.id)"
>>>>>>> de6ee5519dcd05bbf97714b1e0df9bfe4ece0ed5
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
          variant="primary-30"
          pill
<<<<<<< HEAD
          @click="amenities.push({ type: null, amenity: '' })"
=======
          class="px-3"
          @click="onAdd"
>>>>>>> de6ee5519dcd05bbf97714b1e0df9bfe4ece0ed5
        >
          <b-icon-plus />
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
    id () {
      return this.selectedLocation.locationId
    },
<<<<<<< HEAD
    amenities() {
      return this.selectedLocation.properties.amenities
=======
    amenities () {
      return this.locationById(this.id).properties.amenities
>>>>>>> de6ee5519dcd05bbf97714b1e0df9bfe4ece0ed5
    }
  },
  methods: {
    onAdd () {
      this.$emit('on-add')
    }
  }
}
</script>

<style>

</style>
