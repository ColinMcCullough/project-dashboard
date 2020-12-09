<template>
  <div>
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
            :placeholder="toDoProps.placeholder? toDoProps.placeholder : ''"
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
      <b-col class="ml-3 mb-2">
        <b-btn
          variant="primary-30"
          :disabled="toDoProps.maxItems
            ?toDoProps.list.length >= toDoProps.maxItems : false"
          pill
          class="px-3"
          @click="onAdd"
        >
          <b-icon-plus />
          Add
        </b-btn>
      </b-col>
    </b-row>
  </div>
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
          propName: '',
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
          { locIdx, prop: this.toDoProps.propName, index, key, val }
        )
      } else {
        this.$store.dispatch('locations/updatePropArrayIndex',
          { locIdx, prop: this.toDoProps.propName, index, val }
        )
      }
      this.updateLocation({ locIdx, key: 'edited', val: true })
    },
    onAdd () {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      const val = this.toDoProps.isArrObjects ? { type: null, value: null } : ''
      this.$store.dispatch('locations/addItem', { locIdx, prop: this.toDoProps.propName, val })
      this.updateLocation({ locIdx, key: 'edited', val: true })
    },
    onDelete (index) {
      const locIdx = this.getLocationIndex(this.selectedLocation.locationId)
      this.$store.dispatch('locations/deletePropArrByIndex', { locIdx, prop: this.toDoProps.propName, index })
      this.updateLocation({ locIdx, key: 'edited', val: true })
    }
  }
}
</script>

<style>

</style>
