<template>
  <b-card
    footer-class="d-flex justify-content-end border-0"
    footer-tag="footer"
    footer-bg-variant="white"
    no-body
    class="border-0"
  >
    <accordion-wrapper v-bind="{ isOpen: true, title: 'Client Information', section: 'client'}">
      <client-intake v-bind="{ existingClients }" />
    </accordion-wrapper>
    <accordion-wrapper v-bind="{ isOpen: false, title: 'Location Information', section: 'locations'}">
      <intake-table />
    </accordion-wrapper>
    <template v-slot:footer>
      <save-intake />
    </template>
  </b-card>
</template>

<script>

import GlobalFunctions from '~/mixins/global-functions'
import Locations from '~/mixins/locations'
export default {
  components: {},
  mixins: [Locations, GlobalFunctions],
  data () {
    return {
      existingClients: [],
      err: ''
    }
  },
  computed: {

  },
  async mounted() {
    try {
      const res = await this.$axios
        .$get('api/hub/clients')
      this.existingClients = res
    } catch (e) {
      this.err = e
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
