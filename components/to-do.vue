<template>
  <b-container fluid class="p-2">
    <b-row
      v-for="(item, index) in toDoProps.list"
      :key="`${item}-${index}`"
      class="mb-2"
      no-gutters
    >
      <b-col v-if="toDoProps.isArrObjects">
        <b-input-group>
          <b-input-group-prepend class="d-flex align-items-center px-3 font-weight-bold text-uppercase text-secondary-60">
            {{ toDoProps.label }}
          </b-input-group-prepend>
          <b-form-select
            :value="item.type"
            :options="toDoProps.options"
            @change="onUpdate($event, index, 'type')"
          />
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group>
          <b-input-group-prepend v-if="!toDoProps.isArrObjects" class="d-flex align-items-center px-3 font-weight-bold text-uppercase text-secondary-60">
            {{ toDoProps.label }}
          </b-input-group-prepend>
          <b-form-input
            :value="toDoProps.isArrObjects ? item.value : item"
            @input="toDoProps.isArrObjects
              ? onUpdate($event, index, 'value')
              : onUpdate($event, index)"
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
  props: {
    toDoProps: {
      type: Object,
      default() {
        return {
          list: [],
          label: '',
          listName: '',
          options: null,
          isArrObjects: false
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    vertical () {
      return this.selectedLocation.properties.vertical
    }

  },
  methods: {
    onUpdate(val, index, key = null) {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      if (key) {
        this.$store.dispatch('locations/updatePropArrayObject',
          { locIdx, prop: this.toDoProps.listName, index, key, val }
        )
      } else {
        this.$store.dispatch('locations/updatePropArrayIndex',
          { locIdx, prop: this.toDoProps.listName, index, val }
        )
      }
      this.updateLocation({ locIdx, key: 'edited', val: true })
    },
    onAdd () {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      const val = this.toDoProps.isArrObjects ? { type: null, value: null } : ''
      this.$store.dispatch('locations/addItem', { locIdx, prop: this.toDoProps.listName, val })
      this.updateLocation({ locIdx, key: 'edited', val: true })
    },
    onDelete (index) {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      this.$store.dispatch('locations/deletePropArrByIndex', { locIdx, prop: this.toDoProps.listName, index })
      this.updateLocation({ locIdx, key: 'edited', val: true })
    }
  }
}
</script>

<style>

</style>
