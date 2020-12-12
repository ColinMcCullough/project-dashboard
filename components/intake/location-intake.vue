<template>
  <div>
    <b-row class="p-3">
      <div class="px-2 d-flex justify-content-between">
        <b-button class="rounded" variant="warning" @click="$emit('previous-step')">
          <b-icon-arrow-left-circle />
          Previous
        </b-button>
      </div>
      <div class="px-2 d-flex justify-content-between">
        <b-button class="rounded" variant="success" @click="$emit('next-step')">
          Next Step
          <b-icon-arrow-right-circle />
        </b-button>
      </div>
    </b-row>
    <b-table
      id="intakeTbl"
      ref="intakeTbl"
      :items="locations"
      :fields="fields"
      :sort-compare="sortCompare"
      primary-key="key"
      striped
      outlined
      responsive
      head-variant="light"
      class="mb-0 rounded-table"
    >
      <template v-slot:head(url)="{ label }">
        {{ label.toUpperCase() }}
      </template>
      <template v-slot:cell(name)="{ item }">
        {{ item.properties.name }}
      </template>
      <template v-slot:cell(url)="data">
        <b-form-group class="mb-0" style="position: relative;">
          <b-form-input
            :state="validURL(data.item.properties.url)"
            :value="data.item.properties.url"
            placeholder="Paste your url"
            class="text-left"
            required
            @input="onInput($event, data.item.locationId, data.field.key)"
          />
          <b-form-invalid-feedback
            :state="validURL(data.item.properties.url)"
            class="m-0 abs-feedback"
          >
            Invalid Url
          </b-form-invalid-feedback>
        </b-form-group>
      </template>
      <template v-slot:cell(vendor)="data">
        <b-form-group class="mb-0" style="position: relative;">
          <b-form-input
            :value="data.item.properties.vendor"
            placeholder="Location Vendor"
            class="text-left"
            required
            @input="onInput($event, data.item.locationId, data.field.key)"
          />
        </b-form-group>
      </template>
      <template v-slot:cell(valid)="{ item }">
        <icons-swap v-bind="{ needsCheckIcon: validURL(item.properties.url), iconConfig }" />
      </template>
      <template v-slot:cell(corporate)="data">
        <b-form-checkbox
          :checked="data.item.properties.corporate"
          button-variant="secondary"
          name="check-switch"
          size="lg"
          switch
          @change="onInput($event, data.item.locationId, data.field.key)"
        />
      </template>
      <template v-slot:cell(client)="">
        <b-form-select
          :options="clients"
        />
      </template>
    </b-table>
    <b-row>
      <b-col class="text-right pt-1">
        <b-badge v-if="corpSelected > 1" variant="error" class="px-3 rounded" style="padding-top: 1em !important;">
          <b-icon-exclamation-triangle-fill />
          Multiple Corporate Locations Selected.
        </b-badge>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GlobalFunctions from '~/mixins/global-functions'
import Locations from '~/mixins/locations'
export default {
  components: {},
  mixins: [Locations, GlobalFunctions],
  props: {
    clients: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      corpSelected: 0,
      corporateAllEnabled: false,
      singleDomainAllEnabled: false,
      fields: [
        {
          key: 'valid',
          label: 'Valid URL',
          sortable: true
        },
        {
          key: 'name',
          label: 'Location',
          sortable: true
        },
        {
          key: 'url',
          label: 'URL',
          sortable: true
        },
        {
          key: 'vendor',
          label: 'Vendor',
          sortable: true
        },
        {
          key: 'client',
          label: 'Client Association',
          sortable: true
        },
        {
          key: 'corporate',
          label: 'Corporate?',
          sortable: true
        }
      ],
      iconConfig: {
        width: '25',
        height: '25',
        true: '/green-check.svg',
        false: '/red-x.svg'
      }
    }
  },
  computed: {
    disabledBtn() {
      return this.locations
        .some(location => !this.validURL(location.properties.url))
    }
  },
  mounted() {
    this.locations.forEach((location) => {
      if (location.properties.corporate) {
        this.corpSelected++
      }
    })
  },
  methods: {
    updateAll(val, key) {
      this[`${key}AllEnabled`] = val
      this.locations.forEach((location, locIdx) => {
        this.updateOnIndex({ locIdx, key, val })
      })
    },
    onInput(val, locationId, key) {
      if (key === 'corporate') {
        val ? this.corpSelected++ : this.corpSelected--
      }
      const locIdx = this.getLocationIndex(locationId)
      this.updateOnIndex({ locIdx, key, val })
    },
    sortCompare(aRow, bRow, key, sortDesc) {
      let a, b
      if (key !== 'valid') {
        a = aRow.properties[key]
        b = bRow.properties[key]
      } else {
        a = this.validURL(aRow.properties.url)
        b = this.validURL(bRow.properties.url)
      }
      return a < b ? -1 : a > b ? 1 : 0
    }
  }
}
</script>

<style lang="scss">
.rounded-table {
  border-radius: 15px;
  overflow: hidden;
}
.table {
  & td {
    vertical-align: middle;
    padding: .45rem .5rem !important;
  }
}

</style>
