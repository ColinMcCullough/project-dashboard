<template>
  <div>
    <b-row class="p-3">
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
          <b-card v-for="(client, index) in clients" :key="`client-${index}`" header-tag="header" footer-tag="footer">
            <template #header>
              <h6 class="mb-0 text-uppercase font-weight-bold text-gray-60">
                New Client
              </h6>
            </template>
            <b-row>
              <!-- client type select start-->
              <div class="px-3 d-flex justify-content-between">
                <b-form-group label="Select client type" class="pick-client text-uppercase font-weight-bold text-gray-60">
                  <b-form-radio-group
                    id="client-type"
                    :checked="client.clientType"
                    :options="options"
                    buttons
                    button-variant="outline-primary"
                    size="md"
                    name="radio-btn-outline"
                    @change="resetClient($event, index)"
                  />
                </b-form-group>
              </div>
              <!-- client type select end-->
              <!-- select esisting client start -->
              <div v-if="client.clientType === 'existing'" class="px-2 d-flex justify-content-between">
                <b-form-group label="Choose a client" class="text-uppercase font-weight-bold text-gray-60">
                  <!-- @select="onClientSelect($event, index)"
                  @remove="resetClient($event, index)" -->
                  <vue-multiselect
                    :value="client"
                    :options="existingClients"
                    placeholder="Search"
                    track-by="urn"
                    label="name"
                    style="min-width: 260px"
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
              </div>
              <!-- select esisting client end -->
            </b-row>
            <!-- new client form -->
            <div v-if="client.clientType === 'new'">
              <div v-for="(fieldArr, i) in fields" :key="`arr-${i}`">
                <b-row>
                  <b-col v-for="(field, idx) in fieldArr" :key="`${field.id}-${idx}`" class="px-1 col-sm-12 col-lg">
                    <b-form-group
                      v-if="dependencyMet(client, field)"
                      :label="showLabel(client, field) ? field.label : ''"
                      label-class="text-uppercase text-gray font-weight-bold"
                      class="mr-2"
                      style="flex: 1 1 auto;"
                    >
                      <component
                        :is="field.type"
                        :value="client[field.id]"
                        :disabled="client.id"
                        :options="typeof field.options === 'function' ? field.options(client, index) : field.options"
                        :placeholder="field.placeholder"
                        :state="field.validator(client[field.id])"
                        @input="onUpdate({ index, key: field.id, val: $event })"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- new client form -->
            <!-- esisting client form -->
            <div v-if="client.clientType === 'existing'">
              <div v-if="client.id">
                <div v-for="(fieldArr, i) in fields" :key="`arr-${i}`">
                  <b-row>
                    <b-col v-for="(field, idx) in fieldArr" :key="`${field.id}-${idx}`">
                      <b-form-group
                        :label="field.label"
                        label-class="text-uppercase text-gray font-weight-bold"
                        class="mr-2"
                        style="flex: 1 1 auto;"
                      >
                        <component
                          :is="field.type"
                          :value="client[field.id]"
                          :options="typeof field.options === 'function' ? field.options(client, index) : field.options"
                          disabled
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
            <!-- esisting client form -->
            <template #footer>
              <b-button class="rounded" size="sm" variant="danger" @click="onDelete(index)">
                Remove Client
                <b-icon-dash />
              </b-button>
            </template>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import Locations from '~/mixins/locations'
import States from '~/mixins/states'
import Clients from '~/mixins/clients'
export default {
  components: { VueMultiselect },
  mixins: [Locations, Clients, States],
  props: {
    existingClients: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      maxClients: 6,
      instructions: 'Complete all client fields to continue',
      options: [
        { text: 'New Client', value: 'new' },
        { text: 'Existing Client', value: 'existing' }
      ],
      fields: [
        [{
          type: 'b-form-select',
          id: 'domain_type',
          options: [
            { value: null, text: 'Select Domain Strategy' },
            { value: 'SingleDomainClient', text: 'Single Domain' },
            { value: 'MultiDomainClient', text: 'Multi Domain' }
          ],
          label: 'Domain Type',
          validator: val => val !== null
        },
        {
          type: 'b-form-input',
          label: 'Naked Domain',
          id: 'domain',
          placeholder: 'ex. mydomain.com',
          dependentOn: 'domain_type',
          validator: val => this.validNakedDomain(val),
          showIf: val => val === 'SingleDomainClient'
        }],
        [{
          type: 'b-form-select',
          options: [
            { value: null, text: 'Select Vertical' },
            { value: 'Self-Storage', text: 'Self Storage' },
            { value: 'Apartments', text: 'Multi Family' },
            { value: 'Senior-Living', text: 'Senior Living' }
          ],
          id: 'vertical',
          label: 'Vertical',
          validator: val => val !== null
        }],
        [{
          type: 'b-form-input',
          label: 'Client Name',
          id: 'name',
          placeholder: 'ex. My Community',
          validator: val => val !== ''
        },
        {
          type: 'b-form-input',
          label: 'Branded Name',
          id: 'branded_name',
          placeholder: 'ex. My Community 1',
          validator: val => val !== ''
        }],
        [{
          type: 'b-form-input',
          label: 'City',
          id: 'city',
          placeholder: 'ex. Portland',
          validator: val => val !== ''
        },
        {
          type: 'b-form-select',
          options: [
            { value: null, text: 'Select Country' },
            { value: 'US', text: 'United States' },
            { value: 'CA', text: 'Canada' }
          ],
          label: 'Country',
          id: 'country',
          validator: val => val !== null
        },
        {
          type: 'b-form-select',
          label: 'State',
          options: (client, index) => this.getStates(client, index),
          id: 'state',
          validator: val => val !== null
        }]
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
    async nextStep() {
      if (this.validForm) {
        this.$emit('next-step')
        const clientIds = []
        for (let i = 0; i < this.clients.length; i++) {
          if (!this.clients[i].id) {
            const client = await this.$axios.$post('/api/v1/hub/clients', this.clients[i])
            this.onUpdate({ index: i, key: 'id', value: client.id })
            clientIds.push(client.id)
          }
        }
        await this.$axios.$post(`/api/v1/projects/${this.projectId}/clients`, { clientIds })
      }
    },
    validNakedDomain(str) {
      const regex = /^(?!:\/\/)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/ig
      return regex.test(str)
    },
    getStates(client, index) {
      const country = this.clients[index].country
      return country === 'US' || country === 'CA'
        ? this[country].options
        : [{ value: null, text: 'Select Country for States' }]
    },
    showLabel(client, field) {
      let val = true
      if (field.dependentOn && !this.dependencyMet(client, field)) {
        val = false
      }
      return val
    },
    dependencyMet(client, field) {
      let val = false
      if (!field.dependentOn) {
        val = true
      } else {
        const dependentValue = client[field.dependentOn]
        const dependencyMet = field.showIf(dependentValue)
        if (dependencyMet) {
          val = true
        }
      }
      return val
    },
    resetClient(value, index) {
      const entries = Object.entries(this.newClient())
      for (const [key, val] of entries) {
        if (key === 'clientType') {
          if (typeof value !== 'object') { this.onUpdate({ index, key, val: value }) }
        } else { this.onUpdate({ index, key, val }) }
      }
    },
    newClient() {
      return {
        clientType: 'new',
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
    // onClientSelect(client, index) {
    //   console.log(client)
    //   const entries = Object.entries(client)
    //   for (const [key, val] of entries) {
    //     this.onUpdate({ index, key, val })
    //   }
    // }
  }
}
</script>
<style lang="scss">
  .client-group {
    & .card-body {
      min-height: 458px;
    }
  }
  .pick-client label {
    border-radius: 5px;
    margin-right: 1em;
  }
</style>
