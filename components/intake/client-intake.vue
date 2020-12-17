<template>
  <div>
    <b-row class="px-3 pb-2 pt-2">
      <div class="px-2 justify-content-between">
        <b-button
          :disabled="clients.length >= maxClients"
          class="rounded"
          @click="onAdd"
        >
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
              <b-button class="rounded" size="sm" variant="error" @click="onRemove(client, index)">
                Remove Client
                <b-icon-dash />
              </b-button>
              {{ err }}
            </template>
            <div class="d-flex">
              <b-form-group :label="getClientTypeLabel(client)" class="text-uppercase font-weight-bold text-gray-60">
                <b-form-radio-group
                  id="client-type"
                  :checked="client.clientType"
                  :options="getOptions(client)"
                  buttons
                  button-variant="outline-primary"
                  size="md"
                  name="radio-btn-outline"
                  @change="resetClient($event, index)"
                />
              </b-form-group>
              <div v-if="client.clientType === 'existing' && !client.isAssociated" class="px-2 d-flex justify-content-between">
                <client-select v-bind="{ client, index }" />
              </div>
            </div>
            <div v-if="displayForm(client)" class="px-3">
              <client-form v-bind="{ client, index }" />
            </div>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Clients from '~/mixins/clients'
import Locations from '~/mixins/locations'
export default {
  mixins: [Clients, Locations],
  data () {
    return {
      err: '',
      excludedKeys: ['urn', 'id', 'isAssociated', 'clientType'],
      maxClients: 4,
      instructions: 'Complete all client fields to continue.'
    }
  },
  computed: {
    validForm () {
      let val = true
      if (this.clients.length === 0) {
        val = false
      } else if (this.hasDuplicates(this.clients.map(client => client.name))) {
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
            } else if (!value && !this.excludedKeys.includes(key)) {
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
    hasDuplicates(arr) {
      return (new Set(arr)).size !== arr.length
    },
    getClientTypeLabel(client) {
      return client.isAssociated ? 'Selected Client Type' : 'Pick a  Client Type'
    },
    displayForm(client) {
      return (client.clientType === 'new' || (client.clientType === 'existing' && client.urn))
    },
    getOptions (client) {
      return [
        {
          text: 'New Client',
          value: 'new',
          disabled: client.isAssociated && client.clientType === 'existing'
        },
        {
          text: 'Existing Client',
          value: 'existing',
          disabled: client.isAssociated && client.clientType === 'new'
        }
      ]
    },
    async onRemove(client, index) {
      if (this.err) { this.err = '' }
      const { isAssociated, urn } = client
      try {
        // existing client that is associated, dissasociates client from project
        if (urn && isAssociated) {
          const projectId = this.projectId
          await this.$axios.$delete(`/api/v1/projects/${projectId}/clients/${client.id}`)
          // new client that is associated, deleted from g5_updatable table
        } else if (!urn && isAssociated) {
          await this.$axios.$delete(`/api/v1/hub/clients/${client.id}`)
        }
        // removes from app state
        this.onDelete(index)
      } catch (e) {
        this.err = e
      }
    },
    async nextStep () {
      if (this.validForm) {
        this.$emit('next-step')
        const clientIds = []
        for (let i = 0; i < this.clients.length; i++) {
          const client = this.clients[i]
          let clientId = client.id
          // new client
          if (!clientId) {
            const newClient = await this.addNewClient(client, i)
            clientId = newClient.id
          // new client that has been associated with a project
          } else if (client.id && client.urn === null) {
            await this.updateClient(client)
          // existing hub client
          } else if (client.urn) {
            this.onUpdate({ index: i, key: 'isAssociated', val: true })
          }
          clientIds.push(clientId)
        }
        // associates clients with projects
        await this.$axios.$post(`/api/v1/projects/${this.projectId}/clients`, { clientIds })
      }
    },
    // adds client to g5_updataable table, updates app state, returns new client
    async addNewClient (client, index) {
      const res = await this.$axios.$post('/api/v1/hub/clients', client)
      this.onUpdate({ index, key: 'id', val: res.id })
      this.onUpdate({ index, key: 'isAssociated', val: true })
      return res
    },
    // updates existing client values in g5_updatable table
    async updateClient (client) {
      const payload = this.structureClient(client)
      await this.$axios.$put(`/api/v1/hub/clients/${client.id}`, payload)
    },
    // creates structure hub put route  requires
    structureClient (client) {
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
    // adds client to app state
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
