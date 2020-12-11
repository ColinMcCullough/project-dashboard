<template>
  <div>
    <b-row class="p-3">
      <b-col>
        <b-button class="rounded" :disabled="clients.length >=6" @click="onAdd">
          Add Client
          <b-icon-plus />
        </b-button>
      </b-col>
    </b-row>
    <b-row class="p-3">
      <b-col>
        <b-card-group deck>
          <b-card v-for="(client, index) in clients" :key="`client-${index}`" header-tag="header" footer-tag="footer">
            <template #header>
              <h6 class="mb-0">
                New Client
              </h6>
            </template>
            <!-- form area starts-->
            <b-form-group label="Choose a client type">
              <b-form-radio-group
                id="client-type"
                :value="client.clientType"
                :options="options"
                buttons
                button-variant="outline-primary"
                size="sm"
                name="radio-btn-outline"
                @change="resetClient($event, index)"
              />
            </b-form-group>
            <!-- new client form -->
            <div v-if="client.clientType === 'new'">
              <div v-for="(field, i) in fields" :key="`${field.id}-${i}`">
                <b-row v-if="dependencyMet(client, field)">
                  <b-col>
                    <b-form-group
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
                        @change="onUpdate($event, field, index)"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- new client form -->
            <!-- esisting client form -->
            <div v-if="client.clientType === 'existing'">
              <vue-multiselect
                :value="client"
                :options="existingClients"
                placeholder="Search"
                track-by="urn"
                label="name"
                @select="onClientSelect($event, index)"
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
            </div>
            <!-- esisting client form -->
            <!-- form area ends-->
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
    existingClients: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      clients: [],
      selected: null,
      options: [
        { text: 'New Client', value: 'new' },
        { text: 'Existing Client', value: 'existing' }
      ],
      fields: [
        {
          type: 'b-form-select',
          id: 'domain_type',
          options: [
            { value: null, text: 'Select Domain Strategy' },
            { value: 'SingleDomainClient', text: 'Single Domain' },
            { value: 'MultiDomainClient', text: 'Multi Domain' }
          ],
          label: 'Domain Type'
        },
        {
          type: 'b-form-select',
          options: [
            { value: null, text: 'Select Vertical' },
            { value: 'Self-Storage', text: 'Self Storage' },
            { value: 'Apartments', text: 'Multi Family' },
            { value: 'Senior-Living', text: 'Senior Living' }
          ],
          id: 'vertical',
          label: 'Vertical'
        },
        {
          type: 'b-form-input',
          label: 'Naked Domain',
          id: 'naked_domain',
          placeholder: 'ex. mydomain.com',
          dependentOn: 'domain_type',
          showIf: val => val === 'SingleDomainClient'
        },
        {
          type: 'b-form-input',
          label: 'Client Name',
          id: 'name',
          placeholder: 'ex. My Community'
        },
        {
          type: 'b-form-input',
          label: 'Branded Name',
          id: 'branded_name',
          placeholder: 'ex. My Community 1'
        },
        {
          type: 'b-form-input',
          label: 'City',
          id: 'city',
          placeholder: 'ex. Portland'
        },
        {
          type: 'b-form-select',
          options: [
            { value: null, text: 'Select Country' },
            { value: 'US', text: 'United States' },
            { value: 'CA', text: 'Canada' }
          ],
          label: 'Country',
          id: 'country'
        },
        {
          type: 'b-form-select',
          label: 'State',
          options: (client, index) => this.getStates(client, index),
          id: 'state'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
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
      console.log('fired')
      const entries = Object.entries(this.newClient())
      for (const [key, val] of entries) {
        if (key === 'clientType') {
          this.clients[index][key] = value
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
        naked_domain: '',
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

</style>
