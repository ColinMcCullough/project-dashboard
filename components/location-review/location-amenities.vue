<template>
  <b-container fluid class="p-2" style="border: 3px solid pink;">
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
export default {
  props: {
    amenities: {
      type: Array,
      default() {
        return [
          { id: '', value: '' },
          { id: '', value: '' },
          { id: '', value: '' },
          { id: '', value: '' }
        ]
      }
    }
  }
}
</script>

<style>

</style>
