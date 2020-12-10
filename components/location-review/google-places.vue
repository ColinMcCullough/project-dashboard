<template>
  <div class="my-3">
    <b-row class="mx-2">
      <b-input-group
        v-for="(type, key, index) in types"
        :key="`key-${index}`"
        :prepend="key"
        class="pb-1"
      >
        <b-form-input
          v-model="types[key]"
          style="border-width: 1px"
          @input="onInput($event, key)"
        />
      </b-input-group>
    </b-row>
    <b-row class="mx-2">
      <b-col class="pl-0">
        <!-- disable button with tooltip telling user to check address if incomplete -->
        <b-btn variant="primary" :disabled="disabledAddress" @click="getPlaces()">
          Get Places
          <b-icon icon="arrow-clockwise" :animation="loading" font-scale="1" />
        </b-btn>
        <p v-if="disabledAddress" class="text-danger">
          Complete address fields to run
        </p>
        {{ err }}
        <b-col />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GlobalFunctions from '~/mixins/global-functions'
import Locations from '~/mixins/locations'
export default {
  mixins: [GlobalFunctions, Locations],
  data () {
    return {
      loading: '',
      err: null,
      vertical: 'mf',
      types: {
        restaurant: '',
        clothing_store: '',
        primary_school: '',
        administrative_area_level_2: '',
        colloquial_area: '',
        intersection: '',
        locality: '',
        neighborhood: '',
        political: '',
        route: '',
        sublocality: '',
        sublocality_level_1: ''
      }
    }
  },
  computed: {
    id() {
      return this.selectedLocation.locationId
    },
    location() {
      return this.locationById(this.id)
    },
    disabledAddress() {
      return !this.validateAddFields()
    }
  },
  methods: {
    onInput(val, key) {
      // eslint-disable-next-line no-console
      console.log(key, val)
    },
    validateAddFields() {
      const properties = this.location.properties
      return properties.street_address_1 &&
        properties.city && properties.state &&
        properties.postal_code
    },
    getPlacesBody() {
      const { properties } = this.location
      // eslint-disable-next-line camelcase
      const { street_address_1, city, state, postal_code } = properties
      return {
        address: street_address_1,
        city,
        state,
        zip: postal_code,
        types: Object.keys(this.types),
        vertical: this.vertical
      }
    },
    async getPlaces() {
      this.loading = 'spin'
      const body = this.getPlacesBody()
      try {
        const data = await this.$axios.$post('/api/places-api', body)
        Object.keys(data).forEach((type) => {
          this.types[type] = data[type].filter(val => val !== body.city).join()
        })
      } catch (e) {
        this.err = e.message
      } finally {
        this.loading = ''
      }
    }
  }
}
</script>

<style>
</style>
