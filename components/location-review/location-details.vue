<template>
  <div class="my-3">
    <b-row class="mx-2">
      <b-input-group
        v-for="(field, i) in fields"
        :key="`detail-${i}`"
        :prepend="titleCase(field)"
        class="pb-1"
      >
        <b-form-input
          v-if="inputs.includes(field)"
          :placeholder="`Enter ${titleCase(field)}`"
          :state="validate(field)"
          :value="form[field]"
          style="border-width: 1px"
          @input="onInput($event, field)"
        />
        <b-form-invalid-feedback
          :state="validate(field)"
          class="m-0 abs-feedback"
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
            form.state = null
            form[field] = $event
          }"
        />
      </b-input-group>
    </b-row>
    <accordion-toggle
      :id="accordionId"
      :text="accordionTxt"
      :visible="visible"
      @visible-update="updateVisible"
    />
    <usps-validation
      v-if="visible"
      :id="id"
    />
  </div>
</template>

<script>
import States from '~/mixins/states'
import Locations from '~/mixins/locations'
import GlobalFunctions from '~/mixins/global-functions'
export default {
  mixins: [States, Locations, GlobalFunctions],
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data () {
    return {
      fields: [
        'name',
        'street_address_1',
        'street_address_2',
        'city',
        'state',
        'postal_code',
        'country',
        'local_phone_number',
        'display_phone_number'
      ],
      visible: false,
      accordionTxt: 'USPS Verification',
      accordionId: 'usps-validation',
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
    updateVisible(val) {
      this.visible = val
    },
    onInput(val, key) {
      const locIdx = this.getLocationIndex(this.id)
      if (key === 'local_phone_number' || key === 'display_phone_number') {
        const formatted = val.replace(/(\d{3})-?(\d{3})-?(\d{4})/, '$1-$2-$3')
        this.onUpdate({ locIdx, key, val: formatted })
      } else {
        this.onUpdate({ locIdx, key, val })
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
        return 'EX: 555-555-555'
      }
    }
  }
}
</script>

<style>
  .abs-feedback {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    max-width: 25%;
    text-align: center;
    font-weight: 700;
    z-index: 9999;
  }
</style>
