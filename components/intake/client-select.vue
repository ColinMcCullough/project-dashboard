<template>
  <b-form-group label="Choose a client" class="text-uppercase font-weight-bold text-gray-60">
    <vue-multiselect
      :value="client"
      :options="existingClients"
      placeholder="Search"
      track-by="urn"
      label="name"
      style="min-width: 260px"
      @select="onClientSelect($event, index)"
      @remove="resetClient($event, index)"
    >
      <template v-slot:option="{ option }">
        <b>
          {{ option.name }}
        </b>
        <p class="text-muted small mb-0">
          {{ option.brandedName }}
        </p>
        <p class="text-muted small mb-0">
          {{ option.urn }}
        </p>
      </template>
    </vue-multiselect>
  </b-form-group>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import Clients from '~/mixins/clients'
export default {
  components: { VueMultiselect },
  mixins: [Clients],
  props: {
    client: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  methods: {
    // populates client state with existing client info
    onClientSelect(client, index) {
      const entries = Object.entries(client)
      for (const [key, val] of entries) {
        this.onUpdate({ index, key, val })
      }
    }
  }
}
</script>
