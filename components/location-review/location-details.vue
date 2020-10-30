<template>
  <div class="my-3">
    <b-input-group
      v-for="(field, i) in fields"
      :key="`detail-${i}`"
      :prepend="fieldFormatter(field)"
    >
      <b-form-input
        v-if="inputs.includes(form[field])"
        :value="form[field]"
        @input="($event) => { form[field] = $event }"
      />
    </b-input-group>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {
          name: null,
          street_address_1: null,
          street_address_2: null,
          city: null,
          state: null,
          postal_code: null,
          country: null,
          local_phone_number: null,
          display_phone_number: null
        }
      }
    }
  },
  data () {
    return {
      inputs: ['name', 'street_address_1', 'street_address_2', 'city', 'postal_code', 'local_phone_number', 'display_phone_number'],
      selects: ['state', 'country']
    }
  },
  computed: {
    fields() {
      return Object.keys(this.form)
    }
  },
  methods: {
    fieldFormatter(str) {
      return str.replace(/_/g, ' ').toUpperCase()
    }
  }
}
</script>

<style>

</style>
