<template>
  <div>
    <b-row class="p-3">
      <div class="px-2 justify-content-between">
        <b-button class="px-4 rounded" variant="secondary" @click="$emit('previous-step')">
          <b-icon-arrow-left />
          Previous
        </b-button>
      </div>
      <div class="px-2 justify-content-between">
        <b-button class="rounded px-4" variant="primary" @click="nextStep">
          Next
          <b-icon-arrow-right />
        </b-button>
      </div>
      <b-form-invalid-feedback :state="validForm" class="pl-2">
        {{ instructions }}
      </b-form-invalid-feedback>
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
      class="mb-0 rounded-table pl-2"
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
          text-field="name"
        />
      </template>
    </b-table>
    <b-row>
      <b-col class="text-right pt-1">
        <b-badge v-if="corpSelected > 1" variant="error" class="px-2 py-2 rounded" style="padding-top: 1em !important;">
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
      instructions: 'Complete all client associatons and urls to continue',
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
    },
    validForm() {
      let valid = true
      for (let i = 0; i < this.locations.length; i++) {
        const location = this.locations[i]
        if (!this.validURL(location.properties.url) || !location.client) {
          valid = false
          break
        }
      }
      return valid
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
    nextStep() {
      this.$emit('next-step')
      // use code below when location.client is being set by drop down
      // if (this.validForm) {
      //   this.$emit('next-step')
      // }
    },
    updateAll(val, key) {
      this[`${key}AllEnabled`] = val
      this.locations.forEach((location, locIdx) => {
        this.updateOnIndex({ locIdx, key, val })
      })
    },
    onInput(val, locationId, key) {
      console.log(val)
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
