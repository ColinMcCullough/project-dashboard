<template>
  <b-container fluid class="p-2">
    <b-row
      v-for="amenity in amenities"
      :key="amenity.id"
      class="mb-2"
    >
      <b-col>
        <b-input-group prepend="Type">
          <b-form-select />
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
  name: 'location-amenities',
  mixins: [Locations],
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    amenities() {
      return this.locationById(this.id).properties.amenities
    }
  }
}
</script>

<style>

</style>
