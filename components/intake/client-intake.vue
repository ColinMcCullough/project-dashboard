<template>
  <div>
    <b-row class="p-3">
      <div class="px-2 d-flex justify-content-between">
        <b-button class="rounded" :disabled="clients.length >=6" @click="onAdd">
          Add Client
          <b-icon-plus />
        </b-button>
      </div>
      <div class="px-2 d-flex justify-content-between">
        <b-button class="rounded" variant="success" @click="$emit('next-step')">
          Next Step
          <b-icon-arrow-right-circle />
        </b-button>
      </div>
    </b-row>
    <b-row class="p-3">
      <b-col>
        <b-card-group deck class="client-group">
          <b-card v-for="(client, index) in clients" :key="`client-${index}`" header-tag="header" footer-tag="footer">
            <template #header>
              <h6 class="mb-0">
                New Client
              </h6>
            </template>
            <b-row>
              <!-- client type select start-->
              <div class="px-2 d-flex justify-content-between">
                <b-form-group label="Choose a client type">
                  <b-form-radio-group
                    id="client-type"
                    :value="client.clientType"
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
                <b-form-group label="Choose a client">
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
                        {{ option.name }}]
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
                        :options="typeof field.options === 'function' ? field.options(client, index) : field.options"
                        :placeholder="field.placeholder"
                        :state="field.validator(client[field.id])"
                        @input="onUpdate($event, field, index)"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- new client form -->
            <!-- esisting client form -->
            <div v-if="client.clientType === 'existing'">
              <div v-if="client.urn">
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
import States from '~/mixins/states'
export default {
  components: { VueMultiselect },
  mixins: [States],
  props: {
    clients: {
      type: Array,
      default() {
        return []
      }
    },
    existingClients: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      selected: null,
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
    invalidFields() {
      let val
      if (this.clients.lenght === 0) {
        val = true
      } else {
        for (let i = 0; i < this.clients.length; i++) {
          const clientKeys = Object.keys(this.clients[i])
          console.log(clientKeys)
          val = clientKeys.some(key => !this.clients[i][key])
          if (val) { break }
        }
      }
      return val
    }
  },
  methods: {
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
    onUpdate(value, field, index) {
      this.clients[index][field.id] = value
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
          if (typeof value !== 'object') { this.clients[index][key] = value }
        } else { this.clients[index][key] = val }
      }
    },
    newClient() {
      return {
        clientType: null,
        urn: null,
        name: '',
        branded_name: '',
        city: '',
        state: null,
        country: null,
        domain: '',
        domain_type: null,
        vertical: null
      }
    },
    onAdd() {
      const client = this.newClient()
      this.clients.push(client)
    },
    onClientSelect(client, index) {
      const entries = Object.entries(client)
      for (const [key, val] of entries) {
        this.clients[index][key] = val
      }
    },
    onDelete(index) {
      this.clients.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
  .client-group {
    & .card-body {
      min-height: 458px;
    }
  }
</style>
