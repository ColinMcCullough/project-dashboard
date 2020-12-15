<template>
  <div>
    <b-row class="px-3 pb-2 pt-2">
      <div class="px-2 justify-content-between">
        <b-button class="rounded" :disabled="clients.length >= maxClients" @click="onAdd">
          Add Client
          <b-icon-plus />
        </b-button>
      </div>
      <div class="px-2 justify-content-between">
        <b-button class="px-4 rounded" variant="primary" @click="nextStep">
          Next
          <b-icon-arrow-right />
        </b-button>
      </div>
      <b-form-invalid-feedback :state="validForm" class="pl-2">
        {{ instructions }}
      </b-form-invalid-feedback>
    </b-row>
    <b-row class="px-3">
      <b-col class="px-2">
        <b-card-group deck class="client-group">
          <b-card
            v-for="(client, index) in clients"
            :key="`client-${index}`"
            header-tag="header"
            footer-tag="footer"
            class="client-card"
          >
            <template #header>
              <h6 class="mb-0 text-uppercase font-weight-bold">
                New Client
              </h6>
            </template>
            <template #footer>
              <b-button v-if="client.urn === null" class="rounded" size="sm" variant="danger" @click="onDelete(index)">
                Remove Client
                <b-icon-dash />
              </b-button>
            </template>
            <b-row>
              <!-- client type select start-->
              <div class="px-3 d-flex justify-content-between">
                <b-form-group label="Select client type" class="pick-client text-uppercase font-weight-bold text-gray-60">
                  <b-form-radio-group
                    id="client-type"
                    v-model="selected"
                    :options="getOptions(client)"
                    buttons
                    button-variant="outline-primary"
                    size="md"
                    name="radio-btn-outline"
                    @change="resetClient($event, index)"
                  />
                </b-form-group>
              </div>
              <!-- client type select end-->
              <div v-if="selected === 'existing'" class="px-2 d-flex justify-content-between">
                <client-select v-bind="{ client, index }" />
              </div>
            </b-row>
            <div v-if="!(selected === 'existing' && !client.urn)" class="px-3">
              <client-form v-bind="{ client, index }" />
            </div>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Locations from '~/mixins/locations'
import Clients from '~/mixins/clients'
export default {
  mixins: [Locations, Clients],

  data () {
    return {
      maxClients: 6,
      instructions: 'Complete all client fields to continue',
      selected: 'new',
      options: [
        { text: 'New Client', value: 'new' },
        { text: 'Existing Client', value: 'existing' }
      ]
    }
  },
  computed: {
    validForm() {
      let val = true
      if (this.clients.length === 0) {
        val = false
      } else {
        let i = 0
        while (val && i < this.clients.length) {
          const client = this.clients[i]
          const clientKeys = Object.keys(client)
          for (let k = 0; k < clientKeys.length; k++) {
            const key = clientKeys[k]
            const value = client[key]
            if (key === 'domain') {
              if (client.domain_type === 'SingleDomainClient' && !value) {
                val = false
                break
              }
            } else if (!value && key !== 'urn' && key !== 'id') {
              val = false
              break
            }
          }
          i++
        }
      }
      return val
    }
  },
  methods: {
    getOptions(client) {
      return [
        { text: 'New Client', value: 'new', disabled: client.urn !== null && client.isAssoicated },
        { text: 'Existing Client', value: 'existing', disabled: client.urn === null && client.id !== null }
      ]
    },
    async nextStep() {
      if (this.validForm) {
        this.$emit('next-step')
        const clientIds = []
        for (let i = 0; i < this.clients.length; i++) {
          let clientId = this.clients[i].id
          if (!this.clients[i].id) {
            const client = this.addNewClient(this.clients[i], i)
            clientId = client.id
          } else if (this.clients[i].id && this.clients[i].urn === null) {
            await this.updateClient(this.clients[i])
          }
          clientIds.push(clientId)
        }
        await this.$axios.$post(`/api/v1/projects/${this.projectId}/clients`, { clientIds })
      }
    },
    async addNewClient(client, index) {
      const res = await this.$axios.$post('/api/v1/hub/clients', client)
      this.onUpdate({ index, key: 'id', value: res.id })
      return res
    },
    async updateClient(client) {
      const payload = this.structureClient(client)
      await this.$axios.$put(`/api/v1/hub/clients/${client.id}`, payload)
    },
    structureClient(client) {
      return {
        name: client.name,
        properties: {
          branded_name: client.branded_name,
          city: client.city,
          country: client.country,
          domain: client.domain,
          state: client.state,
          vertical: client.vertical,
          domain_type: client.domain_type
        }
      }
    },
    newClient() {
      return {
        urn: null,
        name: '',
        branded_name: '',
        city: '',
        state: null,
        country: null,
        domain: '',
        domain_type: null,
        vertical: null,
        id: null
      }
    },
    onAdd() {
      const client = this.newClient()
      this.addClient(client)
    }
  }
}
</script>
<style lang="scss">
  .client-group {
    & .card-body {
      min-height: 50vh;
      overflow-y: scroll;
      max-height: 50vh;
    }
  }
  .pick-client label {
    border-radius: 5px;
    margin-right: 1em;
  }
  .client-group {
    & .card-header {
      padding: 0.5rem 1.25rem;
    }
  }
</style>
