<template>
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
    <template v-slot:head(singleDomain)="data">
      <div class="d-flex align-items-center">
        <b-form-checkbox
          :checked="singleDomainAllEnabled"
          size="lg"
          style="transform: translateY(-10%);"
          name="check-button"
          switch
          @input="updateAll($event, data.column)"
        />
        <div>
          {{ data.label }}
        </div>
      </div>
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
    <template v-slot:cell(singleDomain)="data">
      <b-form-checkbox
        :checked="data.item.properties.singleDomain"
        button-variant="secondary"
        name="check-switch"
        size="lg"
        switch
        @change="onInput($event, data.item.locationId, data.field.key)"
      />
    </template>
    <!-- <template v-slot:custom-foot>
      <div>
        <b-badge v-if="corpSelected > 1" variant="error" class="px-3 rounded" style="padding-top: 1em !important;">
          <b-icon-exclamation-triangle-fill />
          Multiple Corporate Locations Selected.
        </b-badge>
      </div>
    </template> -->
  </b-table>
</template>

<script>
import GlobalFunctions from '~/mixins/global-functions'
import Locations from '~/mixins/locations'
export default {
  components: {},
  mixins: [Locations, GlobalFunctions],
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
          key: 'singleDomain',
          label: 'Single Domain?',
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
.abs-feedback {
  position: absolute !important;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  max-width: 35%;
  text-align: center;
  font-weight: 700;
  // z-index: 9999;
}

</style>
