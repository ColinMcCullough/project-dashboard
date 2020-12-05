<template>
  <div class="my-3">
    <div
      v-for="(fieldRow, i) in fields"
      :key="`field-row-${i}`"
      class="d-flex justify-content-between w-100 mb-0 flex-wrap"
    >
      <b-form-group
        v-for="(field, idx) in fieldRow"
        :key="`detail-${idx}`"
        :label="titleCase(field)"
        label-class="text-uppercase text-gray font-weight-bold"
        class="mr-2"
        style="flex: 1 1 auto;"
      >
        <b-form-input
          v-if="inputs.includes(field)"
          :placeholder="`Enter ${titleCase(field)}`"
          :state="validate(field)"
          :value="form[field]"
          @input="onInput($event, field)"
        />
        <b-form-invalid-feedback
          :state="validate(field)"
          class="m-0"
        >
          {{ getFeedback(field) }}
        </b-form-invalid-feedback>
        <b-form-select
          v-if="field === 'state'"
          :id="`${field}-${i}`"
          :value="form[field]"
          :state="form[field] !== null"
          :options="getStates"
          @change="onInput($event, field)"
        />
        <b-form-select
          v-if="field === 'country'"
          :id="`${field}-${i}`"
          :value="form[field]"
          :state="form[field] !== null"
          :options="country.options"
          @change="($event) => {
            onInput(null, 'state')
            onInput($event, field)
          }"
        />
      </b-form-group>
    </div>
  </div>
</template>

<script>
import States from '~/mixins/states'
import Locations from '~/mixins/locations'
import GlobalFunctions from '~/mixins/global-functions'
export default {
  mixins: [States, Locations, GlobalFunctions],
  data () {
    return {
      fields: [
        ['name'],
        ['street_address_1', 'street_address_2'],
        ['city', 'state', 'postal_code', 'country'],
        ['local_phone_number', 'display_phone_number']
      ],
      phoneRegex: /^\d{3}-\d{3}-\d{4}$/,
      inputs: ['name', 'street_address_1', 'street_address_2', 'city', 'postal_code', 'local_phone_number', 'display_phone_number'],
      selects: ['state', 'country'],
      country: {
        selected: null,
        options: [
          { value: null, text: 'Select Country' },
          { value: 'US', text: 'United States' },
          { value: 'CA', text: 'Canada' }
        ]
      }
    }
  },
  computed: {
    id() {
      return this.selectedLocation.locationId
    },
    form() {
      return this.locationById(this.id).properties
    },
    getStates() {
      const country = this.form.country
      return this.form.country === 'US' || this.form.country === 'CA'
        ? this[country].options
        : [{ value: null, text: 'Select Country for States' }]
    }
  },
  methods: {
    onInput(val, key) {
      const locIdx = this.getLocationIndex(this.id)
      if (key === 'local_phone_number' || key === 'display_phone_number') {
        const formatted = val.replace(/(\d{3})-?(\d{3})-?(\d{4})/, '$1-$2-$3')
        this.updateOnIndex({ locIdx, key, val: formatted }, true)
      } else {
        this.updateOnIndex({ locIdx, key, val }, true)
      }
    },
    validate(field) {
      let valid = false
      if (field === 'street_address_2') {
        valid = true
      } else if (field === 'local_phone_number' || field === 'display_phone_number') {
        valid = this.phoneRegex.test(this.form[field])
      } else if (this.form[field]) {
        valid = true
      }
      return valid
    },
    getFeedback(field) {
      if (field === 'local_phone_number' || field === 'display_phone_number') {
        return 'ex. 123-456-7890'
      }
    }
  }
}
</script>

<style lang="scss">
.abs-feedback {
  position: relative;
  &__feedback {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    max-width: 25%;
    text-align: center;
    font-weight: 700;
    z-index: 9999;
  }
}
</style>
