<template>
  <b-container fluid class="p-2">
    <b-row
      v-for="(amenity, index) in amenities"
      :key="`${amenity}-${index}`"
      class="mb-2"
      no-gutters
    >
      <b-col>
        <b-input-group>
          <b-input-group-prepend class="d-flex align-items-center px-3 font-weight-bold text-uppercase text-secondary-60">
            Amenity Type
          </b-input-group-prepend>
          <b-form-select
            :value="amenity.type"
            :options="types"
            @change="onUpdate($event, 'type', index)"
          />
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group>
          <b-form-input
            :value="amenity.value"
            @input="onUpdate($event, 'value', index)"
          />
          <template v-slot:append>
            <b-btn
              variant="error-20"
              pill
              @click="onDelete(index)"
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
          class="px-3"
          @click="onAdd"
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
    amenities () {
      return this.selectedLocation.properties.amenities
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
