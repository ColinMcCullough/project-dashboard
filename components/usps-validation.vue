<template>
  <div class="m-2">
    <b-card>
      <b-row>
        <b-col>
          <span :id="addressTip" class="block" tabindex="0">
            <b-button
              :disabled="disabledAddress"
              variant="outline-secondary"
              class="px-4"
              block
              @click="verifyAddress"
            >
              Run USPS Validation
            </b-button>
            <b-tooltip target="address-tip" variant="secondary" placement="topleft">
              complete address fields
            </b-tooltip>
          </span>
        </b-col>
        <b-col>
          <b-button
            :disabled="res === null || getUSPSProps[0].name === 'Error'"
            variant="secondary"
            block
            class="text-center"
            @click="updateData"
          >
            Use USPS Provided Address
          </b-button>
        </b-col>
      </b-row>
      <hr>
      <div v-if="res === null || getUSPSProps[0].name === 'Error' || res.data.elements[0].name === 'Error'">
        <b-row>
          <b-col
            v-for="(prop,index) in Object.keys(headers)"
            :key="index"
            class="ml-0 mr-0"
          >
            <p>
              {{ `${titleCase(headers[prop])}: N/A` }}
            </p>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <b-row>
          <b-col
            v-for="(property, index) in getUSPSProps"
            :key="index"
            class="ml-0 mr-0"
          >
            <p v-if="Object.keys(uspsprops).includes(property.name)">
              {{ titleCase(`${headers[uspsprops[property.name]]}: ${property.elements[0].text}`) }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    res: {
      type: Object,
      default() {
        return {}
      }
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      allowed: ['street_address_1', 'city', 'state', 'postal_code'],
      uspsprops: {
        Address2: 'street_address_1',
        City: 'city',
        State: 'state',
        Zip5: 'postal_code'
      },
      headers: {
        street_address_1: 'Address',
        city: 'City',
        state: 'State',
        postal_code: 'Zip Code'
      },
      hidden: true
    }
  },
  computed: {
    getUSPSProps() {
      return this.res !== null
        ? this.res.data.elements[0].elements[0].elements
        : []
    },
    disabledAddress() {
      return !this.validateAddFields()
    },
    addressTip() {
      return !this.validateAddFields() ? 'address-tip' : 'not-disabled'
    }
  },
  methods: {
    titleCase(str) {
      return str.replace(/_/g, ' ').toLowerCase().split(' ').map((word) => {
        return (`${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      }).join(' ')
    },
    hide() {
      this.$bvModal.hide('usps-modal')
    },
    updateData() {
      const data = {}
      this.res.data.elements[0].elements[0].elements.forEach((prop) => {
        if (Object.keys(this.uspsprops).includes(prop.name)) {
          const value = prop.name !== 'State' ? this.titleCase(prop.elements[0].text) : prop.elements[0].text
          data[this.uspsprops[prop.name]] = value
        }
      })
      this.updateAddress(data)
      this.hide()
    },
    verifyAddress() {
      //
    },
    validateAddFields() {
      return this.form.street_address_1 &&
        this.form.city && this.form.state &&
        this.form.postal_code &&
        this.form.country
    }
  }
}
</script>

<style>
  footer {
    margin-top: 0em;
  }
</style>
