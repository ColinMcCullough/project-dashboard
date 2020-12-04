<template>
  <b-container fluid class="p-2">
    <b-row
      v-for="amenity in amenities"
      :key="amenity.id"
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
              variant="error-20"
              pill
              @click="onDrop(amenity.id)"
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
  name: 'location-amenities',
  mixins: [Locations],
  computed: {
    id () {
      return this.selectedLocation.locationId
    },
    amenities () {
      return this.locationById(this.id).properties.amenities
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
