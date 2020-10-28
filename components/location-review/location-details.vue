<template>
  <div style="border: 3px solid red;">
    {{ form }}
    <b-input-group
      v-for="(field, i) in fields"
      :key="`detail-${i}`"
      :prepend="field"
    >
      <b-form-input
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
          address1: null,
          address2: null,
          city: null,
          stateProvince: null,
          postalCode: null,
          forwardingNumber: null,
          country: null
        }
      }
    }
  },
  computed: {
    fields() {
      return Object.keys(this.form)
    }
  }
}
</script>

<style>

</style>
