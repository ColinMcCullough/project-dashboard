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
      <b-btn variant="primary" @click="getPlaces()">
        Get Places
        <b-icon icon="arrow-clockwise" :animation="loading" font-scale="1" />
      </b-btn>
      {{ err }}
    </b-row>
  </div>
</template>

<script>
import GlobalFunctions from '~/mixins/global-functions'
import Locations from '~/mixins/locations'
export default {
  mixins: [GlobalFunctions, Locations],
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
      loading: '',
      err: null,
      vertical: 'mf',
      types: {
        restaurant: '',
        clothing_store: '',
        primary_school: ''
      }
    }
  },
  computed: {
  },
  methods: {
    onInput(val, key) {
      // eslint-disable-next-line no-console
      console.log(key, val)
    },
    getPlacesBody() {
      const { properties } = this.locationById(this.id)
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
          this.types[type] = data[type].join()
        })
      } catch (e) {
        // not logging message send back from the server
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
